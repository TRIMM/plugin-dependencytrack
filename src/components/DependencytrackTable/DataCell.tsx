import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { Link } from '@backstage/core-components';

const Root = styled('div')(({ theme }) => ({
  minWidth: 260,
  position: 'relative',
  '&::before': {
    left: -16,
    position: 'absolute',
    width: '4px',
    height: '100%',
    content: '""',
    backgroundColor: (theme.palette as any).status?.error ?? theme.palette.error.main,
    borderRadius: 2,
  },
}));


export const KeyCell = ({ keyvaluePair }: { keyvaluePair: {key: string, value: number}}) => (
  <Root>
    <Typography variant="body1" display="block" gutterBottom sx={{ mb: 0 }}>
      {keyvaluePair.key}
    </Typography>
  </Root>
);

export const ValueCell = ({ keyvaluePair }: { keyvaluePair: {key: string, value: number}}) => (
  <div>
    <Typography variant="body1" display="block" gutterBottom sx={{ mb: 0 }}>
      {keyvaluePair.value}
    </Typography>
  </div>
);

export const StringCell = ({ text }: { text: string}) => (
  <div>
    <Typography variant="body1" display="block" gutterBottom sx={{ mb: 0 }}>
      {text}
    </Typography>
  </div>
);

export const LinkCell = ({ text, url }: { text: string, url: string}) => (
  <div>
    <Link to={url}>
      <Typography variant="body1" display="block" gutterBottom sx={{ mb: 0 }}>
        {text}
      </Typography>
    </Link>
  </div>
);
