import { memo, useReducer, useCallback } from 'react';
import { Card, SimpleGrid, Button, Text, Stack, Title, ThemeIcon } from '@mantine/core';
import { IconCalculator } from '@tabler/icons-react';

type CalcState = { display: string; prev: number | null; op: string | null };

type CalcAction =
  | { type: 'DIGIT'; digit: string }
  | { type: 'OP'; op: string }
  | { type: 'EQUALS' }
  | { type: 'CLEAR' }
  | { type: 'DOT' };

function calcReducer(state: CalcState, action: CalcAction): CalcState {
  switch (action.type) {
    case 'CLEAR':
      return { display: '0', prev: null, op: null };
    case 'DIGIT':
      return {
        ...state,
        display:
          state.display === '0' ? action.digit : state.display + action.digit,
      };
    case 'DOT':
      return state.display.includes('.')
        ? state
        : { ...state, display: state.display + '.' };
    case 'OP': {
      const current = parseFloat(state.display);
      if (state.prev !== null && state.op) {
        const result = applyOp(state.prev, current, state.op);
        return { display: String(result), prev: result, op: action.op };
      }
      return { ...state, prev: current, op: action.op, display: '0' };
    }
    case 'EQUALS': {
      if (state.prev === null || !state.op) return state;
      const result = applyOp(state.prev, parseFloat(state.display), state.op);
      return { display: String(result), prev: null, op: null };
    }
    default:
      return state;
  }
}

function applyOp(a: number, b: number, op: string): number {
  switch (op) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '×':
      return a * b;
    case '÷':
      return b === 0 ? 0 : a / b;
    default:
      return b;
  }
}

const KEYS = [
  '7', '8', '9', '÷',
  '4', '5', '6', '×',
  '1', '2', '3', '-',
  'C', '0', '.', '+',
];

export const Calculator = memo(function Calculator({ compact = false }: { compact?: boolean }) {
  const [state, dispatch] = useReducer(calcReducer, {
    display: '0',
    prev: null,
    op: null,
  });

  const handleKey = useCallback((key: string) => {
    if (key === 'C') dispatch({ type: 'CLEAR' });
    else if (['+', '-', '×', '÷'].includes(key)) dispatch({ type: 'OP', op: key });
    else if (key === '.') dispatch({ type: 'DOT' });
    else dispatch({ type: 'DIGIT', digit: key });
  }, []);

  return (
    <Card padding={compact ? 'md' : 'lg'} radius="lg" withBorder>
      <Stack gap="sm">
        {!compact && (
          <Stack gap={4}>
            <ThemeIcon variant="light" color="cyan" size="lg" radius="md">
              <IconCalculator size={20} />
            </ThemeIcon>
            <Title order={4}>Calculator</Title>
          </Stack>
        )}
        <Text
          ta="right"
          fw={700}
          size={compact ? 'lg' : 'xl'}
          ff="monospace"
          py="xs"
          px="sm"
          style={{
            background: 'var(--mantine-color-gray-1)',
            borderRadius: 8,
            wordBreak: 'break-all',
          }}
        >
          {state.display}
        </Text>
        <SimpleGrid cols={4} spacing={6}>
          {KEYS.map((key) => (
            <Button
              key={key}
              variant={['+', '-', '×', '÷'].includes(key) ? 'filled' : 'light'}
              size={compact ? 'xs' : 'sm'}
              onClick={() => handleKey(key)}
              p={0}
            >
              {key}
            </Button>
          ))}
        </SimpleGrid>
        <Button fullWidth onClick={() => dispatch({ type: 'EQUALS' })} size="sm">
          =
        </Button>
      </Stack>
    </Card>
  );
});
