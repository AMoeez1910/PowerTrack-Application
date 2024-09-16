import { images } from "@/constants";
import { carDataProps } from "@/types/type";

export const carData: carDataProps = {
  id: "1",
  img: images.car,
  battery: [
    {
      id: "1",
      name: "Battery 1",
      charge: 20,
      batteryConfig: {
        Cdl: 20,
        Rct: 1,
        R0: 50,
      },
      warning: [
        {
          id: "1",
          message: "Battery Pack Isolation Fault",
        },
        {
          id: "2",
          message: "Battery Pack Over Voltage",
        },
      ],
    },
    {
      id: "2",
      name: "Battery 2",
      charge: 10,
      batteryConfig: {
        Cdl: Math.floor(Math.random() * 50 + 1), // Random value between 1 and 50
        Rct: Number(Math.random().toFixed(2)), // Random value between 0 and 1 with 2 decimals
        R0: Math.floor(Math.random() * 100 + 1), // Random value between 1 and 100
      },
      warning: [
        {
          id: "1",
          message: "Battery Pack Under Voltage",
        },
      ],
    },
    {
      id: "3",
      name: "Battery 3",
      charge: 30,
      batteryConfig: {
        Cdl: Math.floor(Math.random() * 50 + 1),
        Rct: Number(Math.random().toFixed(2)),
        R0: Math.floor(Math.random() * 100 + 1),
      },
      warning: [
        {
          id: "1",
          message: "Battery Overheating",
        },
        {
          id: "2",
          message: "Battery Pack Over Voltage",
        },
      ],
    },
    {
      id: "4",
      name: "Battery 4",
      charge: 80,
      batteryConfig: {
        Cdl: Math.floor(Math.random() * 50 + 1),
        Rct: Number(Math.random().toFixed(2)),
        R0: Math.floor(Math.random() * 100 + 1),
      },
      warning: [],
    },
    {
      id: "5",
      name: "Battery 5",
      charge: 20,
      batteryConfig: {
        Cdl: Math.floor(Math.random() * 50 + 1),
        Rct: Number(Math.random().toFixed(2)),
        R0: Math.floor(Math.random() * 100 + 1),
      },
      warning: [
        {
          id: "1",
          message: "Battery Pack Under Voltage",
        },
        {
          id: "2",
          message: "Battery Discharge Fault",
        },
        {
          id: "3",
          message: "Battery Fully Discharged",
        },
      ],
    },
    {
      id: "6",
      name: "Battery 6",
      charge: 0,
      batteryConfig: {
        Cdl: Math.floor(Math.random() * 50 + 1),
        Rct: Number(Math.random().toFixed(2)),
        R0: Math.floor(Math.random() * 100 + 1),
      },
      warning: [
        {
          id: "1",
          message: "Battery Fully Discharged",
        },
      ],
    },
    {
      id: "7",
      name: "Battery 7",
      charge: 90,
      batteryConfig: {
        Cdl: Math.floor(Math.random() * 50 + 1),
        Rct: Number(Math.random().toFixed(2)),
        R0: Math.floor(Math.random() * 100 + 1),
      },
      warning: [],
    },
    {
      id: "8",
      name: "Battery 8",
      charge: 80,
      batteryConfig: {
        Cdl: Math.floor(Math.random() * 50 + 1),
        Rct: Number(Math.random().toFixed(2)),
        R0: Math.floor(Math.random() * 100 + 1),
      },
      warning: [
        {
          id: "1",
          message: "Battery Cell Imbalance Detected",
        },
      ],
    },
  ],
  info: {
    temperature: 50,
    range: 100,
  },
};

export const warningFix = (warning: string) => {
  const warningMap: { [key: string]: string } = {
    "Battery Pack Isolation Fault":
      "Battery pack isolation faults can lead to severe performance issues and potential safety hazards. Check the battery pack's isolation between cells and between the cells and the case. Ensure that all connections are secure and that there is no visible damage to the insulation. Consider consulting a technician if the fault persists or if you notice any irregularities.",
    "Battery Pack Over Voltage":
      "An over-voltage condition can indicate that the battery is being charged beyond its safe limit, which can reduce battery life or cause safety issues. Verify the charging system settings and ensure that the charging voltage is within the manufacturer's recommended range. Balance the cells if necessary, and inspect the battery management system for faults.",
    "Battery Pack Under Voltage":
      "Under-voltage conditions typically occur when the battery's charge drops below the minimum operational threshold. This can be due to excessive discharge or faulty cells. Inspect the battery pack for any signs of damage or degradation. Ensure that the battery is adequately charged and consider replacing faulty cells or battery packs if the issue persists.",
    "Battery Overheating":
      "Overheating can severely impact battery performance and safety. Ensure that the cooling system is functioning correctly and that the battery is not exposed to high ambient temperatures. Check for proper ventilation around the battery pack and verify that cooling fans or other temperature management systems are operating correctly. Overheating can also be caused by excessive discharge rates or external heat sources.",
    "Battery Discharge Fault":
      "A discharge fault indicates that there may be an issue with the battery's discharge pathways or connections. Inspect the discharge circuit for any faults or obstructions. Verify that all connections are secure and free from corrosion. If the issue persists, it may be necessary to test or replace the battery management system or individual cells.",
    "Battery Fully Discharged":
      "A fully discharged battery should be recharged as soon as possible to prevent damage. Allowing a battery to remain fully discharged for an extended period can lead to capacity loss or permanent damage. Connect the battery to a charger and monitor the charging process to ensure it is functioning correctly. If the battery fails to accept a charge, it may need to be replaced.",
    "Battery Cell Imbalance Detected":
      "Cell imbalance can lead to reduced performance and potential safety hazards. This occurs when cells within the battery pack have different charge levels or capacities. Balance the cells using a battery management system that supports cell balancing. Inspect for any faulty cells and ensure that the battery management system is functioning properly to maintain balance during operation.",
  };
  return warningMap[warning] || `No detailed fix available for: ${warning}`;
};
