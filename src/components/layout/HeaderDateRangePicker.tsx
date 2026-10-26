"use client";

import * as React from "react";
import { Box, Button, List, ListItemButton, ListItemText, Popover, Stack, Typography } from "@mui/material";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { PickerDay, type PickerDayProps } from "@mui/x-date-pickers/PickerDay";
import dayjs, { Dayjs } from "dayjs";

export interface DateRange {
  start: Dayjs;
  end: Dayjs;
}

interface HeaderDateRangePickerProps {
  anchorEl: HTMLElement | null;
  value: DateRange;
  onClose: () => void;
  onApply: (range: DateRange) => void;
}

interface Preset {
  label: string;
  getRange: (today: Dayjs) => DateRange;
}

const PRESETS: Preset[] = [
  { label: "Today", getRange: (today) => ({ start: today, end: today }) },
  { label: "1 Month", getRange: (today) => ({ start: today.subtract(1, "month"), end: today }) },
  {
    label: "Last Month",
    getRange: (today) => {
      const lastMonth = today.subtract(1, "month");
      return { start: lastMonth.startOf("month"), end: lastMonth.endOf("month") };
    },
  },
  { label: "Last 3 Months", getRange: (today) => ({ start: today.subtract(3, "month"), end: today }) },
  { label: "Last 6 Months", getRange: (today) => ({ start: today.subtract(6, "month"), end: today }) },
  { label: "Last 12 Months", getRange: (today) => ({ start: today.subtract(12, "month"), end: today }) },
];

interface RangeDayProps extends PickerDayProps {
  rangeStart: Dayjs | null;
  rangeEnd: Dayjs | null;
}

function RangeDay(props: RangeDayProps) {
  const { rangeStart, rangeEnd, day, ...other } = props;
  const dayValue = dayjs(day as unknown as Dayjs);

  const isStart = Boolean(rangeStart && dayValue.isSame(rangeStart, "day"));
  const isEnd = Boolean(rangeEnd && dayValue.isSame(rangeEnd, "day"));
  const inRange = Boolean(
    rangeStart && rangeEnd && dayValue.isAfter(rangeStart, "day") && dayValue.isBefore(rangeEnd, "day"),
  );
  const isEdge = isStart || isEnd;

  return (
    <PickerDay
      {...other}
      day={day}
      sx={{
        width: 30,
        height: 30,
        margin: 0,
        padding: 0,
        fontSize: "0.75rem",
        fontWeight: isEdge ? 700 : 400,
        transition: "background-color 0.1s ease",
        borderRadius: isEdge ? "50%" : inRange ? 0 : undefined,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "&.MuiPickerDay-dayOutsideMonth": {
          color: "text.disabled",
        },
        ...(inRange && {
          bgcolor: "#fdecea",
          "&:hover": { bgcolor: "#fbe0dd" },
        }),
        ...(isEdge && {
          bgcolor: "error.main",
          color: "error.contrastText",
          "&:hover": { bgcolor: "error.dark" },
          "&:focus": { bgcolor: "error.main" },
        }),
      }}
    />
  );
}

const CALENDAR_WIDTH = 240;

function MonthLabel({ currentMonth }: { currentMonth: Dayjs }) {
  return (
    <Typography variant="body2" sx={{ fontWeight: 700, width: CALENDAR_WIDTH, textAlign: "center" }}>
      {dayjs(currentMonth).format("MMM YYYY")}
    </Typography>
  );
}

const CALENDAR_SX = {
  "& .MuiDateCalendar-root": { height: "auto" },
  "& .MuiDayCalendar-weekDayLabel": {
    width: 30,
    height: 30,
    fontSize: "0.75rem",
    color: "text.secondary",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    margin: 0,
  },
} as const;

export default function HeaderDateRangePicker({
  anchorEl,
  value,
  onClose,
  onApply,
}: HeaderDateRangePickerProps) {
  const [draftRange, setDraftRange] = React.useState<DateRange>(value);
  const [selectingEnd, setSelectingEnd] = React.useState(false);
  const [leftMonth, setLeftMonth] = React.useState(() => value.end.subtract(1, "month").startOf("month"));
  const [selectedPreset, setSelectedPreset] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (anchorEl) {
      setDraftRange(value);
      setSelectingEnd(false);
      const today = dayjs();
      const matchedPreset = PRESETS.find((preset) => {
        const range = preset.getRange(today);
        return range.start.isSame(value.start, "day") && range.end.isSame(value.end, "day");
      });
      setSelectedPreset(matchedPreset ? matchedPreset.label : "Custom Range");
      setLeftMonth(value.end.subtract(1, "month").startOf("month"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [anchorEl]);

  const rightMonth = leftMonth.add(1, "month");

  const handleDayClick = (value: Dayjs | null) => {
    if (!value) return;
    const day = value;
    setSelectedPreset("Custom Range");
    if (!selectingEnd) {
      setDraftRange({ start: day, end: day });
      setSelectingEnd(true);
      return;
    }
    if (day.isBefore(draftRange.start, "day")) {
      setDraftRange({ start: day, end: draftRange.start });
    } else {
      setDraftRange((prev) => ({ ...prev, end: day }));
    }
    setSelectingEnd(false);
  };

  const handlePresetClick = (preset: Preset) => {
    const range = preset.getRange(dayjs());
    setDraftRange(range);
    setSelectingEnd(false);
    setSelectedPreset(preset.label);
    setLeftMonth(range.end.subtract(1, "month").startOf("month"));
  };

  const handleApply = () => onApply(draftRange);

  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      slotProps={{ paper: { sx: { borderRadius: 2, border: "1px solid", borderColor: "divider" } } }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack direction="row">
          <List sx={{ width: 130, py: 0.5, borderRight: "1px solid", borderColor: "divider" }}>
            {PRESETS.map((preset) => (
              <ListItemButton
                key={preset.label}
                selected={selectedPreset === preset.label}
                onClick={() => handlePresetClick(preset)}
                sx={{ py: 0.25, "&.Mui-selected": { bgcolor: "#fdecea" }, "&.Mui-selected:hover": { bgcolor: "#fbe0dd" } }}
              >
                <ListItemText
                  primary={preset.label}
                  slotProps={{
                    primary: {
                      variant: "body2",
                      sx: {
                        fontWeight: selectedPreset === preset.label ? 700 : 400,
                        color: selectedPreset === preset.label ? "error.main" : "text.primary",
                      },
                    },
                  }}
                />
              </ListItemButton>
            ))}
            <ListItemButton
              selected={selectedPreset === "Custom Range"}
              sx={{ py: 0.25, "&.Mui-selected": { bgcolor: "#fdecea" }, "&.Mui-selected:hover": { bgcolor: "#fbe0dd" } }}
            >
              <ListItemText
                primary="Custom Range"
                slotProps={{
                  primary: {
                    variant: "body2",
                    sx: {
                      fontWeight: selectedPreset === "Custom Range" ? 700 : 400,
                      color: selectedPreset === "Custom Range" ? "error.main" : "text.primary",
                    },
                  },
                }}
              />
            </ListItemButton>
          </List>

          <Box sx={{ p: 1 }}>
            <Stack direction="row" spacing={0.5} sx={{ alignItems: "center", justifyContent: "flex-start" }}>
              <Button
                size="small"
                onClick={() => setLeftMonth((m) => m.subtract(1, "month"))}
                sx={{ minWidth: 0, p: 0.5 }}
                aria-label="Previous month"
              >
                <ChevronLeftRoundedIcon fontSize="small" />
              </Button>
              <MonthLabel currentMonth={leftMonth} />
              <MonthLabel currentMonth={rightMonth} />
              <Button
                size="small"
                onClick={() => setLeftMonth((m) => m.add(1, "month"))}
                sx={{ minWidth: 0, p: 0.5 }}
                aria-label="Next month"
              >
                <ChevronRightRoundedIcon fontSize="small" />
              </Button>
            </Stack>

            <Stack direction="row" spacing={0.5} sx={{ mt: 0.5, justifyContent: "flex-start" }}>
              <Box sx={{ width: CALENDAR_WIDTH, ...CALENDAR_SX }}>
                <DateCalendar
                  key={leftMonth.format("YYYY-MM")}
                  value={null}
                  referenceDate={leftMonth}
                  onChange={handleDayClick}
                  views={["day"]}
                  showDaysOutsideCurrentMonth
                  fixedWeekNumber={6}
                  slots={{ calendarHeader: () => null, day: RangeDay as unknown as React.ElementType<PickerDayProps> }}
                  slotProps={{ day: { rangeStart: draftRange.start, rangeEnd: draftRange.end } as never }}
                  sx={{ width: CALENDAR_WIDTH, height: "auto" }}
                />
              </Box>

              <Box sx={{ width: CALENDAR_WIDTH, ...CALENDAR_SX }}>
                <DateCalendar
                  key={rightMonth.format("YYYY-MM")}
                  value={null}
                  referenceDate={rightMonth}
                  onChange={handleDayClick}
                  views={["day"]}
                  showDaysOutsideCurrentMonth
                  fixedWeekNumber={6}
                  slots={{ calendarHeader: () => null, day: RangeDay as unknown as React.ElementType<PickerDayProps> }}
                  slotProps={{ day: { rangeStart: draftRange.start, rangeEnd: draftRange.end } as never }}
                  sx={{ width: CALENDAR_WIDTH, height: "auto" }}
                />
              </Box>
            </Stack>

            <Stack
              direction="row"
              sx={{ mt: 0.5, px: 1, alignItems: "center", justifyContent: "space-between" }}
            >
              <Typography variant="caption" sx={{ fontWeight: 600, color: "error.main" }}>
                {draftRange.start.format("YYYY-MM-DD")} - {draftRange.end.format("YYYY-MM-DD")}
              </Typography>
              <Stack direction="row" spacing={1}>
                <Button size="small" onClick={onClose} sx={{ color: "text.secondary" }}>
                  Cancel
                </Button>
                <Button size="small" variant="contained" color="error" onClick={handleApply}>
                  Apply
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </LocalizationProvider>
    </Popover>
  );
}
