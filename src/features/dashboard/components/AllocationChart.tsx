"use client";

import * as React from "react";
import { Box, Paper, Stack, Typography } from "@mui/material";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import {
  MONTHLY_ALLOCATION,
  REPORTING_RANGE_LABEL,
  SELECTED,
  formatInr,
} from "../data/allocationOverview";

const CHART_HEIGHT = 200;
const Y_AXIS_TICKS = [0, 30, 60, 90, 120];
const MAX_TICK = Y_AXIS_TICKS[Y_AXIS_TICKS.length - 1];
const MAX_COST = Math.max(...MONTHLY_ALLOCATION.map((item) => item.fixedCost));

const SHORT_MONTH_LABEL: Record<string, string> = {
  September: "Sept",
  October: "Oct",
};

const FIXED_COLOR = "#8c93a1";
const VARIABLE_COLOR = "#dde2e9";

function LegendDot({ color, outline = false }: { color: string; outline?: boolean }) {
  return (
    <Box
      sx={{
        width: 10,
        height: 10,
        borderRadius: "2px",
        bgcolor: outline ? "transparent" : color,
        border: outline ? `2px solid ${color}` : "none",
      }}
    />
  );
}

export default function AllocationChart() {
  const [hoveredMonth, setHoveredMonth] = React.useState<string | null>(null);

  return (
    <Paper elevation={0} sx={{ p: 3, border: "1px solid", borderColor: "divider" }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={1.5}
        sx={{ alignItems: { sm: "center" }, justifyContent: "space-between" }}
      >
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Monthly Employee Allocation &amp; IT Cost
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Employee counts and monthly costs shown in aligned panels.
          </Typography>
        </Box>
        <Stack
          direction="row"
          spacing={0.5}
          sx={{
            alignItems: "center",
            alignSelf: { xs: "flex-start", sm: "center" },
            px: 1.5,
            py: 0.5,
            border: "1px solid",
            borderColor: "divider",
            borderRadius: "8px",
          }}
        >
          <Typography variant="body2">{REPORTING_RANGE_LABEL}</Typography>
          <KeyboardArrowDownRoundedIcon sx={{ fontSize: 18, color: "text.secondary" }} />
        </Stack>
      </Stack>

      <Stack direction="row" spacing={3} sx={{ mt: 2.5, mb: 3, flexWrap: "wrap" }}>
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <LegendDot color={FIXED_COLOR} />
          <Typography variant="caption" color="text.secondary">
            Fixed employees
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <LegendDot color={VARIABLE_COLOR} />
          <Typography variant="caption" color="text.secondary">
            Variable employees
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <LegendDot color="#d32f2f" />
          <Typography variant="caption" color="text.secondary">
            Highlighted on hover
          </Typography>
        </Stack>
      </Stack>

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "7fr 5fr" }, gap: 4 }}>
        {/* Employee count bar chart */}
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2 }}>
            Employee count
          </Typography>

          <Stack direction="row" spacing={1}>
            <Stack
              sx={{
                height: CHART_HEIGHT,
                justifyContent: "space-between",
                alignItems: "flex-end",
                pb: 0,
              }}
            >
              {[...Y_AXIS_TICKS].reverse().map((tick) => (
                <Typography key={tick} variant="caption" color="text.secondary">
                  {tick}
                </Typography>
              ))}
            </Stack>

            <Box sx={{ position: "relative", flex: 1, height: CHART_HEIGHT }}>
              <Box sx={{ position: "absolute", inset: 0 }}>
                {Y_AXIS_TICKS.map((tick) => (
                  <Box
                    key={tick}
                    sx={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      bottom: `${(tick / MAX_TICK) * 100}%`,
                      borderTop: "1px dashed",
                      borderColor: "divider",
                    }}
                  />
                ))}
              </Box>

              <Stack
                direction="row"
                sx={{ position: "relative", height: "100%", alignItems: "flex-end", justifyContent: "space-around" }}
              >
                {MONTHLY_ALLOCATION.map((item) => {
                  const isHighlighted = hoveredMonth === item.month;
                  return (
                    <Stack
                      key={item.month}
                      direction="row"
                      spacing={0.75}
                      onMouseEnter={() => setHoveredMonth(item.month)}
                      onMouseLeave={() => setHoveredMonth((current) => (current === item.month ? null : current))}
                      sx={{ alignItems: "flex-end", height: "100%", cursor: "default" }}
                    >
                      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", height: "100%" }}>
                        <Typography
                          variant="caption"
                          sx={{ fontWeight: isHighlighted ? 700 : 400, color: isHighlighted ? "error.main" : "text.primary" }}
                        >
                          {item.fixedEmployees}
                        </Typography>
                        <Box
                          sx={{
                            width: 16,
                            mt: 0.5,
                            height: `${(item.fixedEmployees / MAX_TICK) * 100}%`,
                            bgcolor: isHighlighted ? "error.main" : FIXED_COLOR,
                            borderRadius: "3px 3px 0 0",
                            transition: "background-color 0.15s ease",
                          }}
                        />
                      </Box>
                      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", height: "100%" }}>
                        <Typography
                          variant="caption"
                          sx={{ fontWeight: isHighlighted ? 700 : 400, color: isHighlighted ? "error.main" : "text.secondary" }}
                        >
                          {item.variableEmployees}
                        </Typography>
                        <Box
                          sx={{
                            width: 16,
                            mt: 0.5,
                            boxSizing: "border-box",
                            height: `${(item.variableEmployees / MAX_TICK) * 100}%`,
                            bgcolor: isHighlighted ? "transparent" : VARIABLE_COLOR,
                            border: isHighlighted ? "2px solid" : "none",
                            borderColor: "error.main",
                            borderRadius: "3px 3px 0 0",
                            transition: "background-color 0.15s ease",
                          }}
                        />
                      </Box>
                    </Stack>
                  );
                })}
              </Stack>
            </Box>
          </Stack>

          <Stack direction="row" sx={{ pl: 4, justifyContent: "space-around", mt: 1 }}>
            {MONTHLY_ALLOCATION.map((item) => {
              const isHighlighted = hoveredMonth === item.month;
              return (
                <Typography
                  key={item.month}
                  variant="caption"
                  sx={{ fontWeight: isHighlighted ? 700 : 400, color: isHighlighted ? "error.main" : "text.secondary" }}
                >
                  {item.month}
                </Typography>
              );
            })}
          </Stack>

          <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1.5 }}>
            Reporting month · {REPORTING_RANGE_LABEL}
          </Typography>

          <Stack spacing={1} sx={{ mt: "auto", pt: 2 }}>
            <Typography variant="caption" color="text.secondary">
              Sample rate: ₹10,000 per employee per month for fixed and variable allocations. No
              licence-price breakdown is assumed.
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Budget is an allocation, not spend. No savings or remaining-budget claim is implied.
            </Typography>
          </Stack>
        </Box>

        {/* Monthly allocation cost table */}
        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5 }}>
            Monthly allocation cost (₹)
          </Typography>

          <Stack direction="row" sx={{ pb: 1, borderBottom: "1px solid", borderColor: "divider" }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="caption" color="text.secondary">2026</Typography>
            </Box>
            <Box sx={{ width: 100 }}>
              <Typography variant="caption" color="text.secondary">Fixed</Typography>
            </Box>
            <Box sx={{ width: 100 }}>
              <Typography variant="caption" color="text.secondary">Variable</Typography>
            </Box>
          </Stack>

          {MONTHLY_ALLOCATION.map((item) => {
            const isSelected = item.month === SELECTED.month;
            const fixedPct = (item.fixedCost / MAX_COST) * 100;
            const variablePct = (item.variableCost / MAX_COST) * 100;
            return (
              <Stack
                key={item.month}
                direction="row"
                sx={{ py: 1.25, borderBottom: "1px solid", borderColor: "divider", alignItems: "center" }}
              >
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: isSelected ? 700 : 500, color: isSelected ? "error.main" : "text.primary" }}
                  >
                    {SHORT_MONTH_LABEL[item.month] ?? item.month}
                  </Typography>
                </Box>
                <Box sx={{ width: 100 }}>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: isSelected ? 700 : 500, color: isSelected ? "error.main" : "text.primary" }}
                  >
                    {formatInr(item.fixedCost)}
                  </Typography>
                  <Box sx={{ height: 4, borderRadius: 1, bgcolor: "divider", mt: 0.5, overflow: "hidden" }}>
                    <Box sx={{ height: "100%", width: `${fixedPct}%`, bgcolor: isSelected ? "error.main" : FIXED_COLOR }} />
                  </Box>
                </Box>
                <Box sx={{ width: 100 }}>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: isSelected ? 700 : 500, color: isSelected ? "error.main" : "text.primary" }}
                  >
                    {formatInr(item.variableCost)}
                  </Typography>
                  <Box sx={{ height: 4, borderRadius: 1, bgcolor: "divider", mt: 0.5, overflow: "hidden" }}>
                    <Box sx={{ height: "100%", width: `${variablePct}%`, bgcolor: isSelected ? "error.main" : VARIABLE_COLOR }} />
                  </Box>
                </Box>
              </Stack>
            );
          })}

          <Box sx={{ mt: 2, p: 2, border: "1px solid", borderColor: "divider", borderRadius: 2 }}>
            <Typography variant="body2" sx={{ fontWeight: 700 }}>
              {SELECTED.month} 2026
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Fixed · {SELECTED.fixedEmployees} employees · {formatInr(SELECTED.fixedCost)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Variable · {SELECTED.variableEmployees} employees · {formatInr(SELECTED.variableCost)}
            </Typography>
            <Stack direction="row" spacing={1} sx={{ alignItems: "center", mt: 1 }}>
              <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: "error.main" }} />
              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                Total cost · {formatInr(SELECTED.fixedCost + SELECTED.variableCost)}
              </Typography>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}
