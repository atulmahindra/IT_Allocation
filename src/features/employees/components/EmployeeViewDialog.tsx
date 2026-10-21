import {
  Avatar,
  Box,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import type { Employee } from "../types";

interface EmployeeViewDialogProps {
  open: boolean;
  employee: Employee | null;
  onClose: () => void;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <Grid size={{ xs: 12, sm: 6 }}>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: 600 }}>
        {value}
      </Typography>
    </Grid>
  );
}

export default function EmployeeViewDialog({ open, employee, onClose }: EmployeeViewDialogProps) {
  if (!employee) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        Employee Details
        <IconButton onClick={onClose} size="small" aria-label="Close">
          <CloseRoundedIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Stack direction="row" spacing={2} sx={{ mb: 3, alignItems: "center" }}>
          <Avatar sx={{ width: 56, height: 56, bgcolor: "primary.main", fontSize: 20 }}>
            {getInitials(employee.name)}
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {employee.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {employee.designation} · {employee.employeeCode}
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Chip
            label={employee.status}
            color={employee.status === "Active" ? "success" : "default"}
            size="small"
          />
        </Stack>

        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2.5}>
          <DetailRow label="Email" value={employee.email} />
          <DetailRow label="Phone" value={employee.phone} />
          <DetailRow label="Department" value={employee.department} />
          <DetailRow label="Location" value={employee.location} />
          <DetailRow label="Join date" value={employee.joinDate} />
          <DetailRow label="Employee ID" value={employee.employeeCode} />
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
