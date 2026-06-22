import { Box, Link, Text } from '@backstage/ui';

export const KeyCell = ({ keyvaluePair }: { keyvaluePair: { key: string; value: number } }) => (
  <Box
    minWidth="260px"
    style={{
      borderInlineStart: '4px solid var(--bui-fg-danger)',
      paddingInlineStart: '12px',
    }}
  >
    <Text variant="body-medium">{keyvaluePair.key}</Text>
  </Box>
);

export const ValueCell = ({ keyvaluePair }: { keyvaluePair: { key: string; value: number } }) => (
  <Box>
    <Text variant="body-medium">{keyvaluePair.value}</Text>
  </Box>
);

export const StringCell = ({ text }: { text: string }) => (
  <Box>
    <Text variant="body-medium">{text}</Text>
  </Box>
);

export const LinkCell = ({ text, url }: { text: string; url: string }) => (
  <Box>
    <Link href={url} target="_blank" rel="noopener noreferrer">
      {text}
    </Link>
  </Box>
);
