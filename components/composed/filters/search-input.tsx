import { IconSearch } from "@tabler/icons-react";

import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";

interface Props extends React.ComponentProps<"input"> {
  isLoading?: boolean;
  resultCount?: number;
}

export function SearchInput({ isLoading = false, resultCount, ...props }: Readonly<Props>) {
  return (
    <InputGroup>
      <InputGroupInput placeholder="Buscar..." {...props} />
      <InputGroupAddon>
        <IconSearch />
      </InputGroupAddon>
      {(isLoading || resultCount !== undefined) && (
        <InputGroupAddon align="inline-end">
          {isLoading ? (
            <Spinner />
          ) : (
            <InputGroupText>{resultCount === 1 ? "1 resultado" : `${resultCount} resultados`}</InputGroupText>
          )}
        </InputGroupAddon>
      )}
    </InputGroup>
  );
}
