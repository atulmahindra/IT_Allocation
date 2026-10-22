import { Box, Divider, Popover, Stack, Typography } from "@mui/material";
import type { LaptopAllocationRecord } from "../types";

interface LaptopAssetPopoverProps {
  anchorEl: HTMLElement | null;
  record: LaptopAllocationRecord | null;
  onClose: () => void;
}

const SPEC_ROWS: Array<{ label: string; key: "model" | "serial" | "processor" | "ram" | "storage" | "os" }> = [
  { label: "Model", key: "model" },
  { label: "Serial", key: "serial" },
  { label: "Processor", key: "processor" },
  { label: "RAM", key: "ram" },
  { label: "Storage", key: "storage" },
  { label: "OS", key: "os" },
];

export default function LaptopAssetPopover({ anchorEl, record, onClose }: LaptopAssetPopoverProps) {
  const spec = record?.spec ?? null;

  return (
    <Popover
      open={Boolean(anchorEl) && Boolean(spec)}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      slotProps={{ paper: { sx: { borderRadius: 2, border: "1px solid", borderColor: "divider", boxShadow: 4 } } }}
    >
      {spec && record && (
        <Box sx={{ p: 2, width: 320 }}>
          <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", mb: 1.5 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
              Laptop details
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {record.empId}
            </Typography>
          </Stack>

          <Stack spacing={1}>
            {SPEC_ROWS.map((row) => (
              <Stack key={row.key} direction="row" sx={{ justifyContent: "space-between" }}>
                <Typography variant="body2" color="text.secondary">
                  {row.label}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {spec[row.key]}
                </Typography>
              </Stack>
            ))}
          </Stack>

          <Divider sx={{ my: 1.5 }} />

          <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between" }}>
            <Typography variant="caption" color="text.secondary">
              Last synced · {spec.lastSynced}
            </Typography>
            <Typography variant="caption" sx={{ color: "error.main", fontWeight: 700, cursor: "default" }}>
              View full asset
            </Typography>
          </Stack>
        </Box>
      )}
    </Popover>
  );
}
