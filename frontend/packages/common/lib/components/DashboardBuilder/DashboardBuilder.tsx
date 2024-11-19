import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { AddCircleOutline } from '@mui/icons-material';
import { Box, Button, Grid2 } from '@mui/material';
import { forwardRef, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { DASHBOARD_MAX_WIDGETS_PER_ROW, DASHBOARD_WIDGET_MIN_WIDTH } from '../../configs/dashboard';
import { DEFAULT_BORDER_RADIUS, DEFAULT_HEADER_HEIGHT } from '../../configs/defaults';
import {
  DashboardBuilderRowFormInput,
  DashboardBuilderSectionFormInput,
  DashboardWidgetFormInput,
} from '../../interfaces/FormInputs/DashboardBuilder';
import {
  getEmptyDashboardBuilderRowFormInput,
  getEmptyDashboardBuilderSectionFormInput,
  getEmptyDashboardWidgetFormInput,
  getPlaceholderDashboardWidgetFormInput,
} from '../../utils/dashboardBuilder/initialValues';
import { DashboardBuilderProps } from './DashboardBuilder.types';
import { DashboardBuilderSection } from './Section/Section';
import { DashboardBuilderSidebar } from './Sidebar/Sidebar';
import { DashboardBuilderSidebarWidget } from './Sidebar/Widget/Widget';

const DashboardBuilder = forwardRef<HTMLDivElement, DashboardBuilderProps>(
  ({ readonly, value, widgetConfigurations, onChange }, ref) => {
    const { t } = useTranslation();
    const [activeWidget, setActiveWidget] = useState<DashboardWidgetFormInput | null>(null);
    const [activeSidebarWidgetType, setActiveSidebarWidgetType] = useState<string | null>(null);
    const [sections, setSections] = useState(value ?? [getEmptyDashboardBuilderSectionFormInput()]);

    const placeholderPosition = useMemo(
      () =>
        sections.reduce<number[]>((acc, { rows }, sectionIndex) => {
          const path = rows.reduce<number[]>((acc, { widgets }, rowIndex) => {
            const colIndex = widgets.findIndex(({ type }) => type === 'placeholder');

            if (colIndex === -1) {
              return acc;
            }
            return [rowIndex, colIndex];
          }, []);

          if (path.length === 0) {
            return acc;
          }
          return [sectionIndex, ...path];
        }, []),
      [sections],
    );

    const widgetMinWidth = useMemo(
      () =>
        widgetConfigurations.find(({ type }) => type === activeSidebarWidgetType)?.minWidth ??
        DASHBOARD_WIDGET_MIN_WIDTH,
      [activeSidebarWidgetType, widgetConfigurations],
    );

    useEffect(() => {
      onChange?.(sections);
      // eslint-disable-next-line
    }, [sections]);

    const getRowOccupiedCols = useCallback(
      (path: number[]) => sections[path[0]].rows[path[1]].widgets.reduce((acc, widget) => widget.width + acc, 0),
      [sections],
    );

    const movePlaceholder = useCallback(
      (path: number[], width: number) => {
        const [currentSection, currentRow, currentCol] = placeholderPosition;
        const isPositionPrecise = path.length > 2;

        // If same place of placeholder do nothing
        if (isPositionPrecise && path[0] === currentSection && path[1] === currentRow && path[2] === currentCol) {
          return;
        }

        setSections((sections) =>
          sections.map((section, sectionIndex) => {
            if (sectionIndex !== path[0]) return section;

            {
              // If same row of actual placeholder, move around the row
              if (currentRow === path[1]) {
                return {
                  ...section,
                  rows: section.rows.map((row, rowIndex) => {
                    if (rowIndex === currentRow) {
                      return {
                        ...row,
                        widgets: arrayMove(row.widgets, currentCol, isPositionPrecise ? path[2] : row.widgets.length),
                      };
                    }
                    return row;
                  }),
                };
              }

              // If different row and there is enough space inside, move placeholder inside
              const occupiedCols = getRowOccupiedCols(path);
              if (occupiedCols + width <= DASHBOARD_MAX_WIDGETS_PER_ROW) {
                return {
                  ...section,
                  rows: section.rows.map((row, rowIndex) => {
                    if (rowIndex === currentRow) {
                      return {
                        ...row,
                        widgets: row.widgets.filter((_, colIndex) => colIndex !== currentCol),
                      };
                    }
                    if (rowIndex === path[1]) {
                      row.widgets.splice(
                        isPositionPrecise ? path[2] : row.widgets.length,
                        0,
                        getPlaceholderDashboardWidgetFormInput(width),
                      );
                    }
                    return row;
                  }),
                };
              }

              return section;
            }
          }),
        );
      },
      [getRowOccupiedCols, placeholderPosition],
    );

    const pushPlaceholder = useCallback(
      (path: number[], width: number) => {
        const placeholder = getPlaceholderDashboardWidgetFormInput(activeWidget?.width ?? widgetMinWidth);
        setSections((sections) =>
          sections.map((section, sectionIndex) =>
            sectionIndex === path[0]
              ? {
                  ...section,
                  rows: section.rows.map((row, rowIndex) => {
                    if (
                      getRowOccupiedCols([sectionIndex, rowIndex]) + width > DASHBOARD_MAX_WIDGETS_PER_ROW ||
                      rowIndex !== path[1]
                    ) {
                      return row;
                    }
                    if (path.length > 2) {
                      row.widgets.splice(path[2], 0, placeholder);
                      return row;
                    } else {
                      return {
                        ...row,
                        widgets: [...row.widgets, placeholder],
                      };
                    }
                  }),
                }
              : section,
          ),
        );
      },
      [activeWidget?.width, getRowOccupiedCols, widgetMinWidth],
    );

    const removePlaceholder = useCallback(() => {
      setSections((sections) =>
        sections.map((section) => ({
          ...section,
          rows: section.rows.map((row) => ({
            ...row,
            widgets: row.widgets.filter(({ type }) => type !== 'placeholder'),
          })),
        })),
      );
    }, []);

    const replaceWidgetWithPlaceholder = useCallback((path: number[], width: number) => {
      const placeholder = getPlaceholderDashboardWidgetFormInput(width);
      // Replace widget with placeholder
      setSections((sections) =>
        sections.map((section, sectionIndex) =>
          sectionIndex === path[0]
            ? {
                ...section,
                rows: section.rows
                  .map((row, rowIndex) => {
                    if (rowIndex !== path[1]) {
                      return row;
                    }

                    if (path.length > 2) {
                      return {
                        ...row,
                        widgets: row.widgets.map((widget, colIndex) => (colIndex === path[2] ? placeholder : widget)),
                      };
                    }

                    return {
                      ...row,
                      widgets: [placeholder],
                    };
                  })
                  .reduce<DashboardBuilderRowFormInput[]>((acc, row, rowIndex) => {
                    // If only one row/widget do nothing
                    if (section.rows.length === 1 && section.rows[0].widgets.length === 1) return [row];

                    // Prepend an empty row only if not dragging the only one widget in the first row
                    if (rowIndex === 0 && (path[1] !== 0 || section.rows[path[1]].widgets.length > 1)) {
                      acc = [getEmptyDashboardBuilderRowFormInput()];
                    }

                    acc = [...acc, row];

                    // Push an empty row only if not dragging the only one widget in the row
                    if (
                      ![rowIndex, rowIndex + 1, section.rows.length - 1].includes(path[1]) ||
                      section.rows[path[1]].widgets.length > 1
                    ) {
                      acc = [...acc, getEmptyDashboardBuilderRowFormInput()];
                    }

                    return acc;
                  }, []),
              }
            : section,
        ),
      );
    }, []);

    const replacePlaceholderWithWidget = useCallback(
      (widgetToPush: DashboardWidgetFormInput) => {
        setSections((sections) =>
          sections.map((section, sectionIndex) =>
            sectionIndex === placeholderPosition[0]
              ? {
                  ...section,
                  rows: section.rows.map((row, rowIndex) =>
                    rowIndex === placeholderPosition[1]
                      ? {
                          ...row,
                          widgets: row.widgets.map((widget, colIndex) =>
                            colIndex === placeholderPosition[2] ? widgetToPush : widget,
                          ),
                        }
                      : row,
                  ),
                }
              : section,
          ),
        );
      },
      [placeholderPosition],
    );

    const removePlaceholderAndEmptyRows = useCallback(() => {
      setSections((sections) =>
        sections.map((section) => ({
          ...section,
          rows: section.rows.reduce<DashboardBuilderRowFormInput[]>((acc, row) => {
            const widgets = row.widgets.filter(({ type }) => type !== 'placeholder');
            if (widgets.length === 0) return acc;

            return [
              ...acc,
              {
                ...row,
                widgets,
              },
            ];
          }, []),
        })),
      );
    }, []);

    const reset = useCallback(() => {
      setActiveSidebarWidgetType(null);
      setActiveWidget(null);
    }, []);

    const handleDragStart = useCallback(
      ({ active }: DragStartEvent) => {
        const activeData = active.data.current;
        if (!activeData) {
          return;
        }

        const { path, widget } = activeData;

        if (activeData.isSidebar) {
          setActiveSidebarWidgetType(widget);
          setSections((sections) => {
            if (sections.length === 0) {
              return [getEmptyDashboardBuilderSectionFormInput([getEmptyDashboardBuilderRowFormInput()])];
            }

            return sections.map((section) => ({
              ...section,
              rows:
                section.rows.length === 0
                  ? [getEmptyDashboardBuilderRowFormInput()]
                  : section.rows.reduce<DashboardBuilderRowFormInput[]>((acc, row, rowIndex) => {
                      // Add an initial row
                      if (rowIndex === 0) {
                        acc = [getEmptyDashboardBuilderRowFormInput()];
                      }

                      // Push current row + empty row
                      acc = [...acc, row, getEmptyDashboardBuilderRowFormInput()];

                      return acc;
                    }, []),
            }));
          });
        } else {
          setActiveWidget(widget as DashboardWidgetFormInput);
          replaceWidgetWithPlaceholder(path as number[], (widget as DashboardWidgetFormInput).width);
        }
      },
      [replaceWidgetWithPlaceholder],
    );

    const handleDragOver = useCallback(
      ({ over }: DragOverEvent) => {
        if (!over) {
          removePlaceholder();
        } else {
          const overData = over.data.current;
          if (!overData) {
            return;
          }
          const { path } = overData;

          if (placeholderPosition.length === 0) {
            pushPlaceholder(path as number[], activeWidget?.width ?? widgetMinWidth);
          } else {
            const placeholderWidth = activeWidget?.width ?? widgetMinWidth;
            movePlaceholder(path as number[], placeholderWidth);
          }
        }
      },
      [
        removePlaceholder,
        placeholderPosition.length,
        pushPlaceholder,
        activeWidget?.width,
        widgetMinWidth,
        movePlaceholder,
      ],
    );

    const handleDragEnd = useCallback(
      ({ over }: DragEndEvent) => {
        if (!over || !over.data.current) {
          removePlaceholderAndEmptyRows();
          reset();
          return;
        }

        const { isRow, path } = over.data.current;
        const nextField: DashboardWidgetFormInput =
          activeSidebarWidgetType !== null
            ? getEmptyDashboardWidgetFormInput(activeSidebarWidgetType, widgetMinWidth)
            : activeWidget!;

        if (isRow) {
          setSections((sections) =>
            sections.map((section, sectionIndex) =>
              sectionIndex === path[0]
                ? {
                    ...section,
                    rows: section.rows
                      .map((row, rowIndex) => {
                        if (path.length > 2) {
                          return rowIndex === path[1]
                            ? {
                                ...row,
                                widgets: row.widgets.map((widget, colIndex) =>
                                  colIndex === path[2] ? nextField : widget,
                                ),
                              }
                            : row;
                        }

                        return rowIndex === path[1]
                          ? {
                              ...row,
                              widgets: row.widgets.map((widget) =>
                                widget.type === 'placeholder' ? nextField : widget,
                              ),
                            }
                          : row;
                      })
                      .filter((row) => row.widgets.length !== 0),
                  }
                : section,
            ),
          );
        } else {
          replacePlaceholderWithWidget(nextField);
        }

        removePlaceholderAndEmptyRows();
        reset();
      },
      [
        activeSidebarWidgetType,
        widgetMinWidth,
        activeWidget,
        removePlaceholderAndEmptyRows,
        reset,
        replacePlaceholderWithWidget,
      ],
    );

    const handleAddSection = useCallback(() => {
      setSections((sections) => [...sections, getEmptyDashboardBuilderSectionFormInput()]);
    }, []);

    const handleChange = useCallback(
      (index: number) => (value: DashboardBuilderSectionFormInput | null) => {
        setSections((sections) =>
          value
            ? sections.map((section, sectionIndex) => (sectionIndex === index ? value : section))
            : sections.filter((_, sectionIndex) => sectionIndex !== index),
        );
      },
      [],
    );

    return (
      <DndContext onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
        <Grid2
          container
          ref={ref}
          spacing={2}
          sx={{
            height: readonly ? '100%' : document.documentElement.clientHeight - DEFAULT_HEADER_HEIGHT - 152,
            position: 'relative',
          }}
        >
          <Grid2
            size={{ xs: 12, sm: readonly ? 12 : 10, lg: readonly ? 12 : 10.5 }}
            sx={(theme) => ({
              borderRadius: `${DEFAULT_BORDER_RADIUS}px`,
              ...(!readonly && {
                border: `1px solid ${theme.palette.divider}`,
                height: '100%',
                overflow: 'auto',
                p: 3,
              }),
            })}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
              }}
            >
              {sections.map((section, sectionIndex) => (
                <DashboardBuilderSection
                  key={section.guid}
                  hasPlaceholder={placeholderPosition.length !== 0 && placeholderPosition[0] === sectionIndex}
                  path={sectionIndex}
                  readonly={readonly}
                  section={section}
                  widgetConfigurations={widgetConfigurations}
                  onChange={handleChange(sectionIndex)}
                />
              ))}
              {!readonly && (
                <Button
                  color="secondary"
                  variant="contained"
                  startIcon={<AddCircleOutline />}
                  onClick={handleAddSection}
                >
                  {t('common.component.dashboard_builder.action.add_section')}
                </Button>
              )}
            </Box>
          </Grid2>
          {!readonly && (
            <Grid2
              size={{ xs: 12, sm: 2, lg: 1.5 }}
              sx={{
                height: '100%',
                overflow: 'auto',
              }}
            >
              <DashboardBuilderSidebar widgetConfigurations={widgetConfigurations} />
            </Grid2>
          )}
        </Grid2>
        <DragOverlay dropAnimation={null}>
          {activeWidget && (
            <DashboardBuilderSidebarWidget
              overlay
              widgetConfiguration={widgetConfigurations.find(({ type }) => type === activeWidget.type)!}
            />
          )}
          {activeSidebarWidgetType !== null && (
            <DashboardBuilderSidebarWidget
              overlay
              widgetConfiguration={widgetConfigurations.find(({ type }) => type === activeSidebarWidgetType)!}
            />
          )}
        </DragOverlay>
      </DndContext>
    );
  },
);
DashboardBuilder.displayName = 'DashboardBuilder';

export { DashboardBuilder };
