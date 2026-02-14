interface DateFilter {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

interface SelectFilterOption {
  label: string;
  value: string;
}

interface SelectFilter {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectFilterOption[];
}

export interface FilterProps {
  title: string;
  dateFilters?: DateFilter[];
  selectFilters?: SelectFilter[];
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  onExport?: () => void;
  onRegister?: () => void;
  onRefresh?: () => void;
  onDiscount?: () => void;
  exportDisabled?: boolean;
  onRegisterDisabled?: boolean;
}
