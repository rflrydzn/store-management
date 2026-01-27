"use client";

import React, { useState } from "react";

interface FloorPlanProps {
  className?: string;
  section?: string | null;
  edit?: boolean;
  onChange?: (locationId: string) => void;
}

type Section =
  | "BR1"
  | "BR2"
  | "SHELF"
  | "METAL"
  | "BL1"
  | "BL2"
  | "BL3"
  | "BL4"
  | "W3"
  | "W2"
  | "W1"
  | "RICE"
  | "REF1"
  | "REF2"
  | "DOOR"
  | "WINDOW"
  | "TABLE"
  | "COUNTER"
  | "BUCKET";

const locations = [
  { id: "9d33141d-8baf-4a3e-8aea-77ecdaa47c7f", name: "BL1" },
  { id: "844e3b4d-d6f6-4195-b125-855a89e89ea9", name: "BL2" },
  { id: "1a0466a7-beb3-4d25-ba23-51b2836536ba", name: "BL3" },
  { id: "4eefb9d4-63e1-408a-b6f6-a01e05e97919", name: "BL4" },
  { id: "8aa4cebf-0105-49aa-bc1f-d3cc64579781", name: "REF2" },
  { id: "c8f113d3-1a53-49b7-b990-b64224253581", name: "DOOR" },
  { id: "f4f3ef09-517a-4ab9-bbb7-77cab855b985", name: "METAL" },
  { id: "8895e450-f9c4-4366-b999-b247f3d3ef30", name: "REF1" },
  { id: "f350f96a-973d-4f51-95e8-0ff9adb45277", name: "W1" },
  { id: "ef7f71fa-45f7-4a47-b6b0-a20401daeda4", name: "W2" },
  { id: "97d97673-9be2-4e17-a4bc-5e2be65d4de3", name: "W3" },
  { id: "53421a9b-656f-4882-a18a-3d0ed45c26d3", name: "BUCKET" },
  { id: "82016364-0a7a-4426-85a6-c8d963078cc7", name: "TABLE" },
  { id: "452898d8-fafd-4e87-b0ce-d549fe491bbe", name: "RICE" },
  { id: "dcf9bed2-b3c3-4745-8392-b80594af33ff", name: "COUNTER" },
  { id: "a67c2fb5-40ef-4166-85a7-5a5f4a5c9de5", name: "SHELF" },
  { id: "275f8e4f-e89c-4792-88c9-1c5004193a0e", name: "BR1" },
  { id: "d9555afb-f60b-485e-a681-6185ee1af03c", name: "BR2" },
];

const FloorPlan: React.FC<FloorPlanProps> = ({
  className = "",
  section,
  edit = false,
  onChange,
}) => {
  const [selectedSection, setSelectedSection] = useState<string | null>(
    section ?? null,
  );

  const toggleSection = (section: Section) => {
    if (!edit) return;

    const location = locations.find((l) => l.name === section);
    if (!location) return;

    const nextId = selectedSection === location.id ? "" : location.id;

    setSelectedSection(nextId); // update local state first
    onChange?.(nextId); // then notify parent
  };

  const isSelected = (section: Section) => {
    const location = locations.find((l) => l.name === section);
    return location ? selectedSection === location.id : false;
  };

  const getSectionClass = (section: Section) => {
    return isSelected(section)
      ? "fill-green-400 stroke-black"
      : "fill-white stroke-black hover:fill-gray-100";
  };

  const getTextClass = (section: Section) => {
    return isSelected(section) ? "fill-green-900" : "fill-black";
  };

  return (
    <div className={`w-full max-w-6xl mx-auto ${className}`}>
      <svg viewBox="0 0 1210 850" className="w-full h-auto bg-gray-100">
        {/* Outer walls with hatching pattern */}
        <defs>
          <pattern
            id="hatch"
            patternUnits="userSpaceOnUse"
            width="8"
            height="8"
          >
            <path
              d="M-2,2 l4,-4 M0,8 l8,-8 M6,10 l4,-4"
              stroke="black"
              strokeWidth="1"
            />
          </pattern>
        </defs>

        {/* Left wall */}
        <rect
          x="0"
          y="0"
          width="150"
          height="850"
          fill="url(#hatch)"
          stroke="black"
          strokeWidth="2"
        />

        {/* Top wall */}
        <rect
          x="150"
          y="0"
          width="1060"
          height="40"
          fill="url(#hatch)"
          stroke="black"
          strokeWidth="2"
        />

        {/* Right wall */}
        <rect
          x="1100"
          y="0"
          width="110"
          height="850"
          fill="url(#hatch)"
          stroke="black"
          strokeWidth="2"
        />

        {/* Bottom wall */}
        <rect
          x="150"
          y="810"
          width="950"
          height="40"
          fill="url(#hatch)"
          stroke="black"
          strokeWidth="2"
        />

        {/* Top storage sections BL1, BL2, BL3, BL4 */}
        <g onClick={() => toggleSection("BL1")} className="cursor-pointer">
          <rect
            x="150"
            y="40"
            width="160"
            height="90"
            className={getSectionClass("BL1")}
            strokeWidth="2"
          />
          <text
            x="230"
            y="95"
            textAnchor="middle"
            className={`text-4xl font-bold ${getTextClass("BL1")}`}
          >
            BL1
          </text>
        </g>

        <g onClick={() => toggleSection("BL2")} className="cursor-pointer">
          <rect
            x="310"
            y="40"
            width="160"
            height="90"
            className={getSectionClass("BL2")}
            strokeWidth="2"
          />
          <text
            x="390"
            y="95"
            textAnchor="middle"
            className={`text-4xl font-bold ${getTextClass("BL2")}`}
          >
            BL2
          </text>
        </g>

        <g onClick={() => toggleSection("BL3")} className="cursor-pointer">
          <rect
            x="470"
            y="40"
            width="160"
            height="90"
            className={getSectionClass("BL3")}
            strokeWidth="2"
          />
          <text
            x="550"
            y="95"
            textAnchor="middle"
            className={`text-4xl font-bold ${getTextClass("BL3")}`}
          >
            BL3
          </text>
        </g>

        <g onClick={() => toggleSection("BL4")} className="cursor-pointer">
          <rect
            x="630"
            y="40"
            width="160"
            height="90"
            className={getSectionClass("BL4")}
            strokeWidth="2"
          />
          <text
            x="710"
            y="95"
            textAnchor="middle"
            className={`text-4xl font-bold ${getTextClass("BL4")}`}
          >
            BL4
          </text>
        </g>

        {/* REF 2 */}
        <g onClick={() => toggleSection("REF2")} className="cursor-pointer">
          <rect
            x="790"
            y="40"
            width="130"
            height="130"
            className={getSectionClass("REF2")}
            strokeWidth="2"
          />
          <text
            x="855"
            y="95"
            textAnchor="middle"
            className={`text-2xl font-bold ${getTextClass("REF2")}`}
          >
            REF2
          </text>
          {/* Refrigerator handle */}
          <rect
            x="790"
            y="155"
            width="130"
            height="15"
            fill="gray"
            stroke="black"
            strokeWidth="1"
          />
        </g>

        {/* DOOR 2 */}
        <g
          onClick={() => toggleSection("DOOR")}
          className="cursor-pointer"
          transform="
    translate(960 30)
    scale(0.5)
    rotate(-180 150 150)
  "
        >
          {/* Left pillar */}
          <rect
            x="20"
            y="20"
            width="15"
            height="260"
            fill="white"
            stroke="black"
            strokeWidth="2"
            className={getSectionClass("DOOR")}
          />
          <line
            x1="24"
            y1="20"
            x2="24"
            y2="280"
            stroke="black"
            strokeWidth="1"
            className={getSectionClass("DOOR")}
          />

          {/* Arch outer */}
          <path
            d="M 35 20 A 260 260 0 0 1 280 280"
            fill="none"
            stroke="black"
            strokeWidth="3"
            className={getSectionClass("DOOR")}
          />

          {/* Arch inner */}
          <path
            d="M 35 28 A 252 252 0 0 1 272 280"
            fill="none"
            stroke="black"
            strokeWidth="1"
            className={getSectionClass("DOOR")}
          />

          {/* Base */}
          <rect x="20" y="278" width="260" height="4" fill="black" />

          {/* Right pillar */}
          <rect
            x="265"
            y="230"
            width="15"
            height="50"
            fill="white"
            stroke="black"
            strokeWidth="2"
          />
          <line
            x1="276"
            y1="230"
            x2="276"
            y2="280"
            stroke="black"
            strokeWidth="1"
          />

          {/* Label */}
          <text
            x="150"
            y="200"
            textAnchor="middle"
            className={`text-3xl font-bold ${getTextClass("DOOR")}`}
            transform="rotate(-180, 140, 170)"
          >
            DOOR
          </text>
        </g>

        {/* METAL - Large left section */}
        <g onClick={() => toggleSection("METAL")} className="cursor-pointer">
          <rect
            x="150"
            y="130"
            width="150"
            height="270"
            className={getSectionClass("METAL")}
            strokeWidth="2"
          />
          <text
            x="225"
            y="275"
            textAnchor="middle"
            className={`text-4xl font-bold ${getTextClass("METAL")}`}
          >
            METAL
          </text>
        </g>

        {/* REF 1 */}
        <g onClick={() => toggleSection("REF1")} className="cursor-pointer">
          <rect
            x="150"
            y="400"
            width="130"
            height="180"
            className={getSectionClass("REF1")}
            strokeWidth="2"
          />
          <text
            x="215"
            y="480"
            textAnchor="middle"
            className={`text-2xl font-bold ${getTextClass("REF1")}`}
          >
            REF1
          </text>
          {/* Refrigerator handle */}
          <rect
            x="265"
            y="545"
            width="15"
            height="35"
            fill="gray"
            stroke="black"
            strokeWidth="1"
          />
        </g>

        {/* DOOR 1 – ARCH STYLE */}
        <g
          //   onClick={() => toggleSection("DOOR")}
          //   className="cursor-pointer"
          transform="translate(140 670) scale(0.5)"
        >
          {/* Left pillar */}
          <rect
            x="20"
            y="20"
            width="15"
            height="260"
            fill="white"
            stroke="black"
            strokeWidth="2"
          />
          <line
            x1="24"
            y1="20"
            x2="24"
            y2="280"
            stroke="black"
            strokeWidth="1"
          />

          {/* Arch outer */}
          <path
            d="M 35 20 A 260 260 0 0 1 280 280"
            fill="white"
            stroke="black"
            strokeWidth="3"
          />

          {/* Arch inner */}
          <path
            d="M 35 28 A 252 252 0 0 1 272 280"
            fill="none"
            stroke="black"
            strokeWidth="1"
          />

          {/* Base */}
          <rect x="20" y="278" width="260" height="4" fill="black" />

          {/* Right pillar */}
          <rect
            x="265"
            y="230"
            width="15"
            height="50"
            fill="white"
            stroke="black"
            strokeWidth="2"
          />
          <line
            x1="276"
            y1="230"
            x2="276"
            y2="280"
            stroke="black"
            strokeWidth="1"
          />

          {/* Label */}
          {/* <text
            x="150"
            y="200"
            textAnchor="middle"
            className={`text-xl font-bold ${getTextClass("DOOR")}`}
          >
            DOOR 1
          </text> */}
        </g>

        {/* Bottom section BR1 */}
        <g onClick={() => toggleSection("BR1")} className="cursor-pointer">
          <rect
            x="282"
            y="700"
            width="408"
            height="110"
            className={getSectionClass("BR1")}
            strokeWidth="2"
          />
          <text
            x="475"
            y="765"
            textAnchor="middle"
            className={`text-4xl font-bold ${getTextClass("BR1")}`}
          >
            BR1
          </text>
        </g>

        {/* WINDOW */}

        <text
          x="700"
          y="840"
          textAnchor="middle"
          className={`text-3xl font-bold ${getTextClass("WINDOW")}`}
        >
          WINDOW
        </text>

        {/* BR2 */}
        <g onClick={() => toggleSection("BR2")} className="cursor-pointer">
          <rect
            x="692"
            y="700"
            width="408"
            height="110"
            className={getSectionClass("BR2")}
            strokeWidth="2"
          />
          <text
            x="900"
            y="765"
            textAnchor="middle"
            className={`text-4xl font-bold ${getTextClass("BR2")}`}
          >
            BR2
          </text>
        </g>

        {/* Middle section with W1, W2, W3 */}
        <g onClick={() => toggleSection("W1")} className="cursor-pointer">
          <rect
            x="460"
            y="485"
            width="95"
            height="95"
            className={getSectionClass("W1")}
            strokeWidth="2"
          />
          <text
            x="507"
            y="545"
            textAnchor="middle"
            className={`text-3xl font-bold ${getTextClass("W1")}`}
          >
            W1
          </text>
        </g>

        <g onClick={() => toggleSection("W2")} className="cursor-pointer">
          <rect
            x="555"
            y="485"
            width="95"
            height="95"
            className={getSectionClass("W2")}
            strokeWidth="2"
          />
          <text
            x="602"
            y="545"
            textAnchor="middle"
            className={`text-3xl font-bold ${getTextClass("W2")}`}
          >
            W2
          </text>
        </g>

        <g onClick={() => toggleSection("W3")} className="cursor-pointer">
          <rect
            x="650"
            y="485"
            width="95"
            height="95"
            className={getSectionClass("W3")}
            strokeWidth="2"
          />
          <text
            x="697"
            y="545"
            textAnchor="middle"
            className={`text-3xl font-bold ${getTextClass("W3")}`}
          >
            W3
          </text>
        </g>

        {/* Rice container sections R1, R2, R3 */}
        <g onClick={() => toggleSection("RICE")} className="cursor-pointer">
          <rect
            x="745"
            y="445"
            width="285"
            height="60"
            className={getSectionClass("RICE")}
            strokeWidth="2"
          />
          <text
            x="890"
            y="483"
            textAnchor="middle"
            className={`text-2xl font-bold ${getTextClass("RICE")}`}
          >
            RICE
          </text>
        </g>
        {/* 
        <g onClick={() => toggleSection("R2")} className="cursor-pointer">
          <rect
            x="840"
            y="445"
            width="95"
            height="60"
            className={getSectionClass("R2")}
            strokeWidth="2"
          />
          <text
            x="887"
            y="483"
            textAnchor="middle"
            className={`text-2xl font-bold ${getTextClass("R2")}`}
          >
            R2
          </text>
        </g>

        <g onClick={() => toggleSection("R3")} className="cursor-pointer">
          <rect
            x="935"
            y="445"
            width="95"
            height="60"
            className={getSectionClass("R3")}
            strokeWidth="2"
          />
          <text
            x="982"
            y="483"
            textAnchor="middle"
            className={`text-2xl font-bold ${getTextClass("R3")}`}
          >
            R3
          </text>
        </g> */}
        <g onClick={() => toggleSection("COUNTER")} className="cursor-pointer">
          <rect
            x="1030"
            y="445"
            width="70"
            height="100"
            className={getSectionClass("COUNTER")}
            strokeWidth="2"
          />
          <text
            x="930"
            y="630"
            textAnchor="middle"
            className={`text-XL font-bold ${getTextClass("COUNTER")}`}
            transform="rotate(90 1065 625)"
          >
            COUNTER
          </text>
        </g>

        {/* Rice Container label box */}
        <rect
          x="745"
          y="505"
          width="285"
          height="75"
          fill="white"
          stroke="black"
          strokeWidth="2"
        />
        <text
          x="887"
          y="535"
          textAnchor="middle"
          className="text-xl font-bold fill-black"
        >
          RICE
        </text>
        <text
          x="887"
          y="560"
          textAnchor="middle"
          className="text-xl font-bold fill-black"
        >
          CONTAINER
        </text>
        {/* Bottom lines of rice container */}
        <line
          x1="840"
          y1="505"
          x2="840"
          y2="580"
          stroke="black"
          strokeWidth="2"
        />
        <line
          x1="935"
          y1="505"
          x2="935"
          y2="580"
          stroke="black"
          strokeWidth="2"
        />

        {/* Bucket - three circles */}
        <g onClick={() => toggleSection("BUCKET")} className="cursor-pointer">
          <circle
            cx="768"
            cy="365"
            r="28"
            className={getSectionClass("BUCKET")}
            strokeWidth="2"
          />
          <circle
            cx="820"
            cy="365"
            r="28"
            className={getSectionClass("BUCKET")}
            strokeWidth="2"
          />
          <circle
            cx="872"
            cy="365"
            r="28"
            className={getSectionClass("BUCKET")}
            strokeWidth="2"
          />
          <text
            x="820"
            y="420"
            textAnchor="middle"
            className={`text-xl font-bold ${getTextClass("BUCKET")}`}
          >
            BUCKET
          </text>
        </g>

        {/* Table */}
        <g onClick={() => toggleSection("TABLE")} className="cursor-pointer">
          <rect
            x="900"
            y="345"
            width="180"
            height="95"
            fill="white"
            stroke="black"
            strokeWidth="2"
            strokeDasharray="6,4"
            className={getSectionClass("TABLE")}
          />
          <text
            x="990"
            y="400"
            textAnchor="middle"
            className={`text-2xl font-bold ${getTextClass("TABLE")}`}
          >
            TABLE
          </text>
        </g>

        {/* SHELF - Right section (dashed) */}
        <g onClick={() => toggleSection("SHELF")} className="cursor-pointer">
          <rect
            x="1030"
            y="540"
            width="70"
            height="170"
            fill="white"
            stroke="black"
            strokeWidth="2"
            strokeDasharray="6,4"
            className={getSectionClass("SHELF")}
          />
          <text
            x="1065"
            y="630"
            textAnchor="middle"
            className="text-3xl font-bold fill-black"
            transform="rotate(90 1065 625)"
          >
            SHELF
          </text>
        </g>
      </svg>
    </div>
  );
};

export default FloorPlan;
