import { icons, images } from "@/constants";
import { carDataProps } from "@/types/type";

export const carData: carDataProps = {
  id: "1",
  img: images.car,
  battery: [
    {
      id: "1",
      name: "Battery 1",
      cdl: 0,
      health: 0,
      rct: 0,
      re: 0,
      warns: [],
    },
    {
      id: "2",
      name: "Battery 2",
      cdl: 0,
      health: 0,
      rct: 0,
      re: 0,
      warns: [],
    },
    {
      id: "3",
      name: "Battery 3",
      cdl: 0,
      health: 0,
      rct: 0,
      re: 0,
      warns: [],
    },
    {
      id: "4",
      name: "Battery 4",
      cdl: 0,
      health: 0,
      rct: 0,
      re: 0,
      warns: [],
    },
  ],
};
export type BatteryWarningT = {
  title: string;
  fix: string[];
};
export const warningFix = (warning: string) => {
  const warningMap: { [key: string]: BatteryWarningT } = {
    "1": {
      title: "Lithium Plating",
      fix: [
        "Avoid charging your EV in cold environments",
        "Use slower charging when the battery is cold",
        "Pre-condition or warm up the battery before plugging in",
      ],
    },
    "2": {
      title: "Electrolyte Decomposition",
      fix: [
        "Avoid full charges frequently (stay within 20–80%)",
        "Don’t leave the EV in hot environments",
        "Ensure cooling systems are working properly",
      ],
    },
    "3": {
      title: "SEI Layer Degradation",
      fix: [
        "Avoid letting the battery drop below 10%",
        "Drive and charge moderately",
        "Use manufacturer-recommended charging patterns",
      ],
    },
    "4": {
      title: "SEI Overgrowth",
      fix: [
        "Avoid storing battery fully charged",
        "Use the EV regularly, or run occasional charge cycles",
        "Store battery at around 50% charge if unused for long periods",
      ],
    },
    "5": {
      title: "End of Life (EOL)",
      fix: [
        "Replace the battery module",
        "In future, follow best practices to extend battery life",
        "Consider battery reuse for secondary (stationary) applications if viable",
      ],
    },
  };
  return warningMap[warning] || `No detailed fix available for: ${warning}`;
};
export type NotificationType = {
  id: string;
  title: string;
  type: "warning" | "info" | "update";
  read: boolean;
};
export const notificationData: NotificationType[] = [
  {
    id: "1",
    title: "Battery 2 health is getting low!",
    type: "warning",
    read: false,
  },
  {
    id: "2",
    title: "Recommended steps to increase battery health",
    type: "info",
    read: false,
  },
  {
    id: "3",
    title: "New update available. Download it now!",
    type: "update",
    read: false,
  },
];
