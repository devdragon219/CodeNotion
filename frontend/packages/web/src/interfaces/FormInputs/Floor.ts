export interface FloorTemplateFormInput {
  floorTemplateId: number | null;
  name: string;
  position: number | null;
}

export interface FloorTemplatesFieldValues {
  floorTemplates: FloorTemplateFormInput[];
}

export interface FloorFormInput {
  floorId: number | null;
  guid: string;
  name: string;
  position: number;
}
