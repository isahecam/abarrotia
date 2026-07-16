import { IconSearch } from "@tabler/icons-react";

import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";

interface Props extends React.ComponentProps<"input"> {
  isLoading: boolean;
}

export function SearchInput({ isLoading = false, ...props }: Readonly<Props>) {
  return (
    <InputGroup>
      <InputGroupInput placeholder="Buscar..." {...props} />
      <InputGroupAddon>
        <IconSearch />
      </InputGroupAddon>
      {isLoading && (
        <InputGroupAddon align="inline-end">
          <Spinner />
        </InputGroupAddon>
      )}
    </InputGroup>
  );
}
