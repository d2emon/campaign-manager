import { Badge } from "@mantine/core";

interface NoteCategoryProps {
  category?: string;
}

const NoteCategory = ({ category }: NoteCategoryProps) => {
  switch (category) {
    case 'plot':
      return <Badge variant="primary">Сюжет</Badge>;
    case 'npc':
      return <Badge variant="primary">Персонажи</Badge>;
    case 'location':
      return <Badge variant="primary">Локации</Badge>;
    case 'lore':
      return <Badge variant="primary">Лор</Badge>;
    default:
      return null;
  }
};

export default NoteCategory;
