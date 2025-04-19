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

export const warningFix = (warning: string) => {
  const warningMap: { [key: string]: string } = {
    "High Voltage":
      "High voltage can indicate an overcharge condition or a fault in the battery management system. Verify the charging system settings and ensure that the charging voltage is within the manufacturer's recommended range. Check for any faults in the battery management system that may be causing the high voltage condition. If the issue persists, consult a technician for further diagnosis and repair.",
    "High Current":
      "High current can indicate an excessive load on the battery or a fault in the charging system. Reduce the load on the battery to prevent damage and ensure that the charging system is functioning correctly. Check for any short circuits or faults in the wiring that may be causing the high current condition. If the issue persists, consult a technician for further diagnosis and repair.",
    "Cell Overheating":
      "Cell overheating can lead to reduced battery life and potential safety hazards. Ensure that the cooling system is functioning correctly and that the battery is not exposed to high ambient temperatures. Check for proper ventilation around the battery pack and verify that cooling fans or other temperature management systems are operating correctly. Overheating can also be caused by excessive discharge rates or external heat sources.",
    "End of Life":
      "End of life indicates that the battery has reached the end of its usable capacity and should be replaced. Batteries degrade over time and use, resulting in reduced performance and capacity. Replace the battery with a new one to restore performance and prevent potential safety hazards. Properly dispose of the old battery according to local regulations.",
    "High CT Resistance":
      "High charge transfer resistance can indicate poor cell performance or a fault in the battery management system. Check the battery cells for any signs of damage or degradation. Verify that the battery management system is functioning correctly and that the cells are balanced. If the issue persists, consult a technician for further diagnosis and repair.",
    "Low CT Resistance":
      "Low charge transfer resistance can indicate a short circuit or other fault in the battery pack. Check the battery pack for any signs of damage or short circuits. Verify that the connections are secure and free from corrosion. If the issue persists, consult a technician for further diagnosis and repair.",
    "High E Resistance":
      "High internal resistance can indicate poor cell performance or a fault in the battery management system. Check the battery cells for any signs of damage or degradation. Verify that the battery management system is functioning correctly and that the cells are balanced. If the issue persists, consult a technician for further diagnosis and repair.",
    "Low E Resistance":
      "Low internal resistance can indicate a short circuit or other fault in the battery pack. Check the battery pack for any signs of damage or short circuits. Verify that the connections are secure and free from corrosion. If the issue persists, consult a technician for further diagnosis and repair.",
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
