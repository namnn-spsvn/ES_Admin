"use client";

import { saira } from "@/fer-framework/fe-global/assets";

const themeConfig = {
  token: {
    fontFamily: saira.style.fontFamily,
    colorPrimary: `#2575fc`, //linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)
    secondaryColor: "#6a11cb",
  },
  components: {
    Card: {
      headerPadding: 16,
      bodyPadding: 16,
    },
    Menu: {
      itemActiveBg: "#2575fc",
      itemSelectedBg: "#3868eb13",
      itemSelectedColor: "#2575fc",
      itemHoverBg: "#3868eb13",
      itemActiveColor: "#2575fc",
    },
    // Button: {
    //   colorPrimary: "#2575fc",
    //   colorPrimaryHover: "#2574fcb0",
    // },
  },
};

export default themeConfig;
