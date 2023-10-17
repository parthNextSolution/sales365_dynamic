import {
  API_BUTTON,
  API_HEADING,
  API_TEXT,
  AUTO_FETCH_API,
  BAR_CHART,
  CONTAINER,
  CUSTOMTABLE,
  DETAILED_VIEW,
  DYNAMIC_CARD_CONTAINER,
  DYNAMIC_STATE_COMPONENT,
  GET,
  GET_CARD_DATA,
  GET_HOME_SCREEN_DATA,
  GET_SEARCH_RESULT,
  GET_SIMILAR_PROPERTY_DATA,
  HAMBURGER_MENU,
  HEADING,
  HOME_CARD,
  HORIZONTAL_LINE,
  IMAGE_BANNER,
  IMAGE_COMPONENT,
  INSTAGRAM_ICON,
  LINKEDIN_ICON,
  MAINLAYOUT,
  PAGE_FOOTER,
  PAGE_HEADER,
  POST,
  SCROLL_TO_TOP,
  SEARCH_CARD,
  SELECT,
  SELECT_SLIDER,
  SLIDER,
  TOGGLE_BUTTON,
} from "./components/utils/Const";
import { API_ENDPOINTS } from "./redux/utils/api";

const MENU_ITEMS = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Login",
    path: "/login",
  },
];

export const USER_ROLE = {
  bfAdmin: "BuilderFloorAdmin",
  channelPartner: "ChannelPartner",
  salesUser: "SalesUser",
};

const FOOTER = {
  type: PAGE_FOOTER,
  className: "default-home-footer-div",
  HomeLinks: {
    icon: "https://www.builderfloor.com/assets/imgs/template/BUILDER.png",
    url: "https://builder-floor-admin-pannel.vercel.app/",
  },
  social_media: [
    {
      name: INSTAGRAM_ICON,
      url: "https://www.instagram.com/",
    }, //for instagram
    {
      name: LINKEDIN_ICON,
      url: "https://www.linkedin.com/",
    },
  ],
  copyright: "© Builder Floor Official 2022",
};

const HEADER = {
  type: CONTAINER,
  className: "homeHeader",
  children: [
    {
      type: HAMBURGER_MENU,
      items: MENU_ITEMS,
    },
    {
      type: PAGE_HEADER,
      url: "https://builder-floor-admin-pannel.vercel.app/",
      image: "https://www.builderfloor.com/assets/imgs/template/BUILDER.png",
      title: "BuilderFloor.com",
    },
  ],
};

const SCROLLTOP = {
  type: SCROLL_TO_TOP,
  name: "ScrollToTop",
};
export const HOME_SCREEN = {
  name: "Home Screen",
  children: [
    HEADER,
    { type: HORIZONTAL_LINE },
    {
      type: AUTO_FETCH_API,
      api: API_ENDPOINTS[GET_HOME_SCREEN_DATA],
      className: "header",
    },
    {
      type: IMAGE_BANNER,
      name: "homeImageBanner",
      className: "home-page-banner",
      text: "Start Exploring Your Dream ",
      spanText: "Builder Floor now",
      bgImage:
        "https://thumbs.dreamstime.com/b/mumbai-capital-india-mumbai-india-december-mumbai-financial-commercial-entertainment-capital-india-december-112388360.jpg",
    },
    {
      type: CONTAINER,
      className: "homeselect",
      children: [
        {
          type: SELECT,
          className: "select-city-button",
          sliceName: "filter",
          name: "city",
          defaultValue: { label: "Gurgaon", value: "Gurgaon" },
          options: [{ label: "Gurgaon", value: "Gurgaon" }],
        },
        {
          type: SLIDER,
          sliceName: "filter",
          className: "select-range",
          name: "budget",
          minValue: 10000000,
          maxValue: 100000000,
          step: 1000000,
          defaultValue: [20000000, 30000000],
        },
        {
          type: API_BUTTON,
          sliceName: "filter",
          name: "search",
          buttonLabel: "Search",
          className: "home-search-button",
          apiType: POST,
          navigate: "/searchResult",
          api: API_ENDPOINTS[GET_SEARCH_RESULT],
          searchWithQueryParams: true,
        },
      ],
    },
    {
      type: HEADING,
      name: "homeScreenHeading",
      tag: "h2",
      className: "home-screen-card-section-heading",
      text: "Explore Top Builder Floor to Match Your Choice",
    },
    {
      type: DYNAMIC_CARD_CONTAINER,
      loadingApi: GET_HOME_SCREEN_DATA,
      className: "default-home-cards",
      apiName: GET_HOME_SCREEN_DATA,
      renderComponentsInLoop: { type: HOME_CARD, className: "homeCards" },
      cardClickApi: API_ENDPOINTS[GET_CARD_DATA],
      cardClickNavigate: "/builderFloorDetails",
      addQueryParam: "{title}-{id}",
      cardClickApiType: GET,
    },
    {
      type: HEADING,
      name: "homeScreenBottom",
      tag: "h2",
      className: "home-screen-card-section-bottom",
      text: "We are your trusted partner in finding your dream builder floor in Gurgaon",
    },
    FOOTER,
    SCROLLTOP,
  ],
};

export const CARD_DETAILS_SCREEN = {
  name: "Card Detail Screen",
  children: [
    HEADER,
    { type: HORIZONTAL_LINE },
    {
      type: AUTO_FETCH_API,
      api: API_ENDPOINTS[GET_SIMILAR_PROPERTY_DATA],
      className: "header",
    },
    {
      type: DETAILED_VIEW,

      name: "detailedViewImage",
      loadingApi: GET_CARD_DATA,
      className: "home-page-banner",
      apiSliceName: GET_CARD_DATA,
      whatsappText: `Hi! I saw a property {link} on BuilderFloor.com and i am interested in it. Is it available?`,
      icons: {
        sectorNumber:
          "https://www.builderfloor.com/assets/imgs/icons/location.png",
        size: "https://www.builderfloor.com/assets/imgs/icons/area.png",
        accommodation:
          "https://www.builderfloor.com/assets/imgs/icons/home.png",
        floor: "https://www.builderfloor.com/assets/imgs/icons/stairs.png",
        facing: "https://www.builderfloor.com/assets/imgs/icons/compass.png",
        possession: "https://www.builderfloor.com/assets/imgs/icons/check.png",
        parkFacing: "https://www.builderfloor.com/assets/imgs/icons/park.png",
        corner: "https://www.builderfloor.com/assets/imgs/icons/right.png",
      },
      moreOptionText: "Explore similar options to match your choice",
    },
    { type: HORIZONTAL_LINE },
    {
      type: DYNAMIC_CARD_CONTAINER,
      loadingApi: GET_SIMILAR_PROPERTY_DATA,
      className: "default-home-cards",
      apiName: GET_SIMILAR_PROPERTY_DATA,
      renderComponentsInLoop: { type: HOME_CARD, className: "homeCards" },
      cardClickApi: API_ENDPOINTS[GET_CARD_DATA],
      cardClickNavigate: "/builderFloorDetails",
      addQueryParam: "{title}-{id}",
      cardClickApiType: GET,
    },
    FOOTER,
    SCROLLTOP,
  ],
};

export const DASHBOARD = {
  name: "Search Result",
  className: "klk",
  children: [
    {
      type: MAINLAYOUT,
      navTitle: "Dashboard >",
      navTitleMain: "",
      navTitleIconSrc: "/assets/sidebar/darker/park.svg",
      children: [
        {
          type: CONTAINER,
          className: "w-[100%] h-auwpabw scroll-bar-cool1  overflow-y-auto ",
          children: [
            {
              type: CONTAINER,
              className: "w-[100%] h-[40px] flex justify-end items-center",
              children: [
                {
                  type: CONTAINER,
                  className:
                    "w-[60px] h-[34px] bg-[#444] mr-[10px] rounded-[10px]",
                  children: [],
                },
              ],
            },
            {
              type: DYNAMIC_STATE_COMPONENT,
              parentClass:
                " w-[100%] h-[50px] border-b-[1px] flex items-center px-[30px] border-[#C0C2C6]",
              childClass:
                " font-medium h-[34px] mx-[20px] tracking-wide cursor-pointer text-[14px] rounded-[12px] flex items-center justify-center px-[18px]",
              states: [
                "Sales Performance",
                "Communication & Interaction",
                "Engagement Reports",
              ],
              children: [
                {
                  type: CONTAINER,
                  className: "w-[100%] h-alp-albka ",
                  children: [
                    {
                      type: CONTAINER,
                      className:
                        "w-[100%] h-[140px]  pt-[10px] grid grid-cols-3 gap-x-[10px] px-[20px]",
                      children: [
                        {
                          type: CONTAINER,
                          className:
                            "h-[130px] px-[18px] pb-[20px] py-[10px] flex flex-col   bg-[#FFF8F7] rounded-[12px] ",
                          children: [
                            {
                              type: API_TEXT,
                              className:
                                "font-medium text-[#585858] text-[15px] shrink-0",
                              form: "normal-text",
                              text: "Open Deals",
                            },
                            {
                              type: CONTAINER,
                              className:
                                "flex items-end h-[100%] justify-between",
                              children: [
                                {
                                  type: API_TEXT,
                                  className:
                                    "font-bold text-[#2E3134] leading-[60px] text-[60px]",
                                  api: "https://api.npoint.io/bbbc40863b28c79dec48",
                                  form: "api-text",
                                  text: "Open Deals",
                                },
                                {
                                  type: CONTAINER,
                                  className: "flex items-center justify-center",
                                  children: [
                                    {
                                      type: IMAGE_COMPONENT,
                                      src: "/assets/dashboard/up.svg",
                                      className: "w-[20px] mr-[5px]",
                                    },
                                    {
                                      type: API_TEXT,
                                      className:
                                        "font-medium text-[#72d86e] text-[20px]",
                                      api: "https://api.npoint.io/b44c7efc30a1a69cb322",
                                      form: "api-text",
                                      text: "Open Deals",
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                        {
                          type: CONTAINER,
                          className:
                            "h-[130px] px-[18px] pb-[20px] py-[10px] flex flex-col   bg-[#FFF8F7] rounded-[12px] ",
                          children: [
                            {
                              type: API_TEXT,
                              className:
                                "font-medium text-[#585858] text-[15px] shrink-0",
                              form: "normal-text",
                              text: "Close Deals",
                            },
                            {
                              type: CONTAINER,
                              className:
                                "flex items-end h-[100%] justify-between",
                              children: [
                                {
                                  type: API_TEXT,
                                  className:
                                    "font-bold text-[#2E3134] leading-[60px] text-[60px]",
                                  api: "https://api.npoint.io/bbbc40863b28c79dec48",
                                  form: "api-text",
                                  text: "Open Deals",
                                },
                                {
                                  type: CONTAINER,
                                  className: "flex items-center justify-center",
                                  children: [
                                    {
                                      type: IMAGE_COMPONENT,
                                      src: "/assets/dashboard/downward.svg",
                                      className: "w-[20px] mr-[5px]",
                                    },
                                    {
                                      type: API_TEXT,
                                      className:
                                        "font-medium text-[#eb3e48] text-[20px]",
                                      api: "https://api.npoint.io/b44c7efc30a1a69cb322",
                                      form: "api-text",
                                      text: "Open Deals",
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                        {
                          type: CONTAINER,
                          className:
                            "h-[130px] px-[18px] pb-[20px] py-[10px] flex flex-col   bg-[#FFF8F7] rounded-[12px] ",
                          children: [
                            {
                              type: API_TEXT,
                              className:
                                "font-medium text-[#585858] text-[15px] shrink-0",
                              form: "normal-text",
                              text: "Lost Deals",
                            },
                            {
                              type: CONTAINER,
                              className:
                                "flex items-end h-[100%] justify-between",
                              children: [
                                {
                                  type: API_TEXT,
                                  className:
                                    "font-bold text-[#2E3134] leading-[60px] text-[60px]",
                                  api: "https://api.npoint.io/bbbc40863b28c79dec48",
                                  form: "api-text",
                                  text: "Open Deals",
                                },
                                {
                                  type: CONTAINER,
                                  className: "flex items-center justify-center",
                                  children: [
                                    {
                                      type: IMAGE_COMPONENT,
                                      src: "/assets/dashboard/down.svg",
                                      className: "w-[20px] mr-[5px]",
                                    },
                                    {
                                      type: API_TEXT,
                                      className:
                                        "font-medium text-[#909193] text-[20px]",
                                      api: "https://api.npoint.io/b44c7efc30a1a69cb322",
                                      form: "api-text",
                                      text: "Open Deals",
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                    {
                      type: CONTAINER,
                      className: "w-[100%] mt-[20px] min-h-[100px] px-[20px]",
                      children: [
                        {
                          type: CONTAINER,
                          className:
                            "w-[100%] min-h-[100px] pb-[20px] flex justify-between px-[18px]",
                          children: [
                            {
                              type: CONTAINER,
                              className: "w-[49%] min-h-[100px]",
                              children: [
                                {
                                  type: BAR_CHART,
                                  title: "Selling Skills",
                                  class: "",
                                  api: "https://api.npoint.io/56b185789319a8d8cc62",
                                },
                                {
                                  type: BAR_CHART,
                                  title: "Average Call Score",
                                  class: "mt-[20px]",
                                  api: "https://api.npoint.io/56b185789319a8d8cc62",
                                },
                                {
                                  type: BAR_CHART,
                                  class: "mt-[20px]",
                                  title: "Number Of Questions Asked",
                                  api: "https://api.npoint.io/56b185789319a8d8cc62",
                                },
                              ],
                            },
                            {
                              type: CONTAINER,
                              className: "w-[49%] min-h-[100px]",
                              children: [
                                {
                                  type: BAR_CHART,
                                  title: "High Intent Call Volume",
                                  class: "",
                                  api: "https://api.npoint.io/56b185789319a8d8cc62",
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  type: CONTAINER,
                  className: "w-[100%] h-alp-albka ",
                  children: [],
                },
                {
                  type: CONTAINER,
                  className: "w-[100%] h-alp-albka ",
                  children: [],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export const SALES_OPEN = {
  name: "Search Result",
  className: "klk",
  children: [
    {
      type: MAINLAYOUT,
      navTitle: "Sales >",
      kanban: true,
      navTitleMain: "Open Leads",
      navTitleIconSrc: "/assets/sidebar/darker/park.svg",
      children: [
        {
          type: CUSTOMTABLE,
          kanban: true,
          actions: [],
          addDataButton: {},
          tableHeaders: [
            {
              text: "Lead ID",
              width: "190px",
            },
            {
              text: "Lead Title",
              width: "300px",
            },
            {
              text: "Company",
            },
            {
              text: "Client POC",
            },
            {
              text: "Contact",
            },
            {
              text: "Lead Status",
            },
            {
              text: "Lead Stage",
            },
            {
              text: "Product/Service",
            },
          ],
          tableItems: [
            {
              property: "_id",
              width: "190px",
            },
            {
              property: "lead_title",
              width: "300px",
            },
            {
              property: "companyId.company_name",
            },
            {
              property: "customerId.name",
            },
            {
              property: "customerId.contact",
            },
            {
              property: "leadStatus",
            },
            {
              property: "leadStage",
            },
            {
              property: "companyId.company_product_category",
            },
          ],
          api: "https://testsalescrm.nextsolutions.in/api/leads/find-all?leadStatus=Open",
          filters: [
            {
              type: "route",
              title: "Status",
              initialValue: 0,
              list: [
                { text: "Open", route: "/sales/open" },
                { text: "Close", route: "/sales/close" },
              ],
            },
          ],

          className:
            "w-[100%] h-auwpabw  overflow-y-auto pl-[20px] pr-[30px] pt-[20px]",
        },
      ],
    },
  ],
};

export const SALES_CLOSE = {
  name: "Search Result",
  className: "klk",
  children: [
    {
      type: MAINLAYOUT,
      navTitle: "Sales >",
      navTitleMain: "Open Leads",
      navTitleIconSrc: "/assets/sidebar/darker/park.svg",
      children: [
        {
          type: CUSTOMTABLE,
          kanban: true,
          actions: [],
          api: "https://testsalescrm.nextsolutions.in/api/leads/find-all?leadStatus=Close",
          tableHeaders: [
            {
              text: "Lead ID",
              width: "190px",
            },
            {
              text: "Lead Title",
              width: "300px",
            },
            {
              text: "Company",
            },
            {
              text: "Client POC",
            },
            {
              text: "Contact",
            },
            {
              text: "Lead Status",
            },
            {
              text: "Lead Stage",
            },
            {
              text: "Product/Service",
            },
          ],
          tableItems: [
            {
              property: "_id",
              width: "190px",
            },
            {
              property: "lead_title",
              width: "300px",
            },
            {
              property: "companyId.company_name",
              width: "190px",
            },
            {
              property: "customerId.name",
            },
            {
              property: "customerId.contact",
            },
            {
              property: "leadStatus",
            },
            {
              property: "leadStage",
            },
            {
              property: "companyId.company_product_category",
            },
          ],
          filters: [
            {
              type: "route",
              title: "Status",
              initialValue: 1,
              list: [
                { text: "Open", route: "/sales/open" },
                { text: "Close", route: "/sales/close" },
              ],
            },
          ],
          className:
            "w-[100%] h-auwpabw  overflow-y-auto pl-[20px] pr-[30px] pt-[20px]",
        },
      ],
    },
  ],
};

export const RECORD_CALL = {
  name: "Search Result",
  className: "klk",
  children: [
    {
      type: MAINLAYOUT,
      navTitle: "Calls > Recorded Calls >",
      navTitleMain: "Scheduled Recordings",
      navTitleIconSrc: "/assets/sidebar/darker/call.svg",
      children: [
        {
          type: CUSTOMTABLE,
          actions: [],
          api: "https://testsalescrm.nextsolutions.in/api/recording/find-all",
          tableItems: [
            {
              property: "_id",
              width: "190px",
            },
            {
              property: "lead_title",
              width: "300px",
            },
            {
              property: "leadId.0._id",
              width: "190px",
            },
            {
              property: "customerId",
            },
            {
              property: "customerId.contact",
            },
            {
              property: "leadStatus",
            },
            {
              property: "leadStage",
            },
            {
              property: "companyId.company_product_category",
            },
            {
              property: "createdAt",
              type: "date",
            },
            {
              property1: "StartTime",
              property2: "EndTime",
              type: "duration",
            },
          ],
          tableHeaders: [
            {
              text: "Call ID",
              width: "190px",
            },
            {
              text: "Call Title",
              width: "300px",
            },
            {
              text: "Lead ID",
              width: "190px",
            },
            {
              text: "Company Name",
            },
            {
              text: "Product/Service",
            },
            {
              text: "Participants",
            },
            {
              text: "Call Owner",
            },
            {
              text: "Call Type",
            },
            {
              text: "Call Date & Time",
            },
            {
              text: "Call Duration",
            },
            {
              text: "Call Score",
            },
            {
              text: "Call Disposition",
            },
          ],
          filters: [
            // {
            //   type: "route",
            //   title: "Status",
            //   initialValue: 1,
            //   list: [
            //     { text: "Open", route: "/sales/open" },
            //     { text: "Close", route: "/sales/close" },
            //   ],
            // },
          ],
          className:
            "w-[100%] h-auwpabw  overflow-y-auto pl-[20px] pr-[30px] pt-[20px]",
        },
      ],
    },
  ],
};

export const ACTIVE_CALL = {
  name: "Search Result",
  className: "klk",
  children: [
    {
      type: MAINLAYOUT,
      navTitle: "Calls > Active Calls >",
      navTitleMain: "Scheduled Recordings",
      navTitleIconSrc: "/assets/sidebar/darker/call.svg",
      children: [
        {
          type: CUSTOMTABLE,
          actions: [],
          api: "https://testsalescrm.nextsolutions.in/api/active-call/find-all",
          tableItems: [
            {
              property: "_id",
              width: "190px",
            },
            {
              property: "lead_title",
              width: "300px",
            },
            {
              property: "leadId.0._id",
              width: "190px",
            },
            {
              property: "customerId",
            },
            {
              property: "customerId.contact",
            },
            {
              property: "leadStatus",
            },
            {
              property: "leadStage",
            },
            {
              property: "companyId.company_product_category",
            },
            {
              property: "createdAt",
              type: "date",
            },
          ],
          tableHeaders: [
            {
              text: "Call ID",
              width: "190px",
            },
            {
              text: "Call Title",
              width: "300px",
            },
            {
              text: "Lead ID",
              width: "190px",
            },
            {
              text: "Company Name",
            },
            {
              text: "Product/Service",
            },
            {
              text: "Participants",
            },
            {
              text: "Call Owner",
            },
            {
              text: "Call Type",
            },
            {
              text: "Call Date & Time",
            },
          ],
          filters: [
            // {
            //   type: "route",
            //   title: "Status",
            //   initialValue: 1,
            //   list: [
            //     { text: "Open", route: "/sales/open" },
            //     { text: "Close", route: "/sales/close" },
            //   ],
            // },
          ],
          className:
            "w-[100%] h-auwpabw  overflow-y-auto pl-[20px] pr-[30px] pt-[20px]",
        },
      ],
    },
  ],
};

export const SEARCH_RESULT = {
  name: "Search Result",
  className: "klk",
  children: [
    HEADER,
    { type: HORIZONTAL_LINE },
    {
      type: CONTAINER,
      className: "actioncontainer",
      children: [
        {
          type: SELECT,
          className: "select-city-button",
          sliceName: "filter",
          name: "city",
          defaultValue: { label: "Gurgaon", value: "Gurgaon" },
          options: [{ label: "Gurgaon", value: "Gurgaon" }],
        },
        {
          type: SLIDER,
          sliceName: "filter",
          name: "budget",
          minValue: 10000000,
          maxValue: 100000000,
          step: 1000000,
          defaultValue: [20000000, 30000000],
        },
        {
          type: API_BUTTON,
          sliceName: "filter",
          name: "search",
          buttonLabel: "Search",
          apiType: POST,
          navigate: "/searchResult",
          api: API_ENDPOINTS[GET_SEARCH_RESULT],
        },
      ],
    },
    {
      type: API_HEADING,
      name: "matchFoundHeading",
      tag: "h2",
      className: "match-found-heading",
      dynamicDetails: {
        api: GET_SEARCH_RESULT,
        textReplace: "_TEXT_TO_REPLACE_",
      },
      text: "_TEXT_TO_REPLACE_ Matches Found",
    },
    {
      type: CONTAINER,
      name: "cardBodyContainer",
      className: "cardBodyContainer",
      children: [
        {
          type: CONTAINER,
          className: "filter-button-div",
          children: [
            {
              type: CONTAINER,
              className: "filter-button-div-overflowed",
              children: [
                {
                  type: SELECT,
                  sliceName: "filter",
                  name: "floor",
                  label: "Floors",
                  className: "filterbutton",
                  onClickApi: API_ENDPOINTS[GET_SEARCH_RESULT],
                  onClickApiMethod: POST,
                  options: [
                    { label: "First Floor", value: "firstFloor" },
                    { label: "Second Floor", value: "secondFloor" },
                    { label: "Third Floor", value: "thirdFloor" },
                    { label: "Fourth Floor", value: "fourthFloor" },
                    {
                      label: "Basement + First Floor",
                      value: "basementPlusFirstFloor",
                    },
                  ],
                },
                {
                  type: SELECT,
                  sliceName: "filter",
                  name: "sectorNumber",
                  label: "Locations",
                  className: "filterChannel",
                  onClickApi: API_ENDPOINTS[GET_SEARCH_RESULT],
                  onClickApiMethod: POST,
                  options: [
                    { label: "DLF City Phase 1", value: "DLF City Phase 1" },
                    { label: "DLF City Phase 2", value: "DLF City Phase 2" },
                    { label: "DLF City Phase 3", value: "DLF City Phase 3" },
                    { label: "DLF City Phase 4", value: "DLF City Phase 4" },
                    { label: "Sector 15 Part 2", value: "Sector 15 Part 2" },
                    { label: "Sector 27", value: "Sector 27" },
                    { label: "Sector 28", value: "Sector 28" },
                    { label: "Sector 38", value: "Sector 38" },
                    { label: "Sector 42", value: "Sector 42" },
                    { label: "Sector 43", value: "Sector 43" },
                    { label: "Sector 45", value: "Sector 45" },
                    { label: "Sector 46", value: "Sector 46" },
                    { label: "South City 1", value: "South City 1" },
                    { label: "Sushant Lok 1", value: "Sushant Lok 1" },
                  ],
                },
                {
                  type: SELECT_SLIDER,
                  sliceName: "filter",
                  name: "size",
                  buttonLabel: "Size",
                  minValue: 0.0,
                  maxValue: 1000.0,
                  onClickApi: API_ENDPOINTS[GET_SEARCH_RESULT],
                  onClickApiMethod: POST,
                  step: 0.1,
                  defaultValue: [180.0, 360.0],
                },
                {
                  type: SELECT,
                  sliceName: "filter",
                  name: "accomodation",
                  label: "Accomodation",
                  className: "filterbutton",
                  onClickApi: API_ENDPOINTS[GET_SEARCH_RESULT],
                  onClickApiMethod: POST,
                  options: [
                    { label: "2 BHK", value: "2 BHK" },
                    { label: "3 BHK", value: "3 BHK" },
                    { label: "4 BHK", value: "4 BHK" },
                    { label: "5 BHK", value: "5 BHK" },
                    { label: "6 BHK", value: "6 BHK" },
                  ],
                },
                {
                  type: SELECT,
                  sliceName: "filter",
                  name: "possession",
                  label: "Possession",
                  className: "filterbutton",
                  onClickApi: API_ENDPOINTS[GET_SEARCH_RESULT],
                  onClickApiMethod: POST,
                  options: [
                    { label: "Ready", value: "Ready" },
                    { label: "1 Months", value: "1 Months" },
                    { label: "3 Months", value: "3 Months" },
                    { label: "6 Months", value: "6 Months" },
                    { label: "9 Months", value: "9 Months" },
                    { label: "12 Months", value: "12 Months" },
                  ],
                },
                {
                  type: SELECT,
                  sliceName: "filter",
                  name: "facing",
                  label: "Facing",
                  className: "filterbutton",
                  onClickApi: API_ENDPOINTS[GET_SEARCH_RESULT],
                  onClickApiMethod: POST,
                  options: [
                    { label: "North", value: "North" },
                    { label: "South", value: "South" },
                    { label: "East", value: "East" },
                    { label: "West", value: "West" },
                    { label: "North-East", value: "North-East" },
                    { label: "North-West", value: "North-West" },
                    { label: "South-East", value: "South-East" },
                    { label: "South-West", value: "South-West" },
                  ],
                },
                {
                  type: SELECT,
                  sliceName: "filter",
                  className: "filterbutton",
                  name: "sortBy",
                  label: "Sort By",
                  onClickApi: API_ENDPOINTS[GET_SEARCH_RESULT],
                  onClickApiMethod: POST,
                  options: [
                    { label: "Price High to Low", value: "Price High to Low" },
                    { label: "Price Low to High", value: "Price Low to High" },
                  ],
                },
                {
                  type: TOGGLE_BUTTON,
                  className: "toogle-filter",
                  sliceName: "filter",
                  onClickApi: API_ENDPOINTS[GET_SEARCH_RESULT],
                  onClickApiMethod: POST,
                  label: "Park",
                  name: "Park",
                },
                {
                  type: TOGGLE_BUTTON,
                  className: "toogle-filter",
                  sliceName: "filter",
                  onClickApi: API_ENDPOINTS[GET_SEARCH_RESULT],
                  onClickApiMethod: POST,
                  label: "Corner",
                  name: "Corner",
                },
                {
                  type: TOGGLE_BUTTON,
                  className: "toogle-filter",
                  sliceName: "filter",
                  label: "Reset",
                  name: "Reset",
                  isReset: true,
                },
              ],
            },
          ],
        },
        {
          type: DYNAMIC_CARD_CONTAINER,
          loadingApi: GET_SEARCH_RESULT,
          sliceName: "filter",
          className: "result-searchdiv",
          apiName: GET_SEARCH_RESULT,
          paginatioName: "searchPage",
          defaultPage: 1,
          cardPerPage: 5,
          onClickApi: API_ENDPOINTS[GET_SEARCH_RESULT],
          onClickApiMethod: POST,
          renderComponentsInLoop: {
            type: SEARCH_CARD,
            className: "homeCards",
          },
          cardClickApi: API_ENDPOINTS[GET_CARD_DATA],
          cardClickNavigate: "/builderFloorDetails",
          cardClickApiType: GET,
        },
      ],
    },
  ],
};

export const SCREENS_TO_RENDER = [HOME_SCREEN];

export const REDIRECTION = {
  [HOME_SCREEN]: "/",
  [SEARCH_RESULT]: "/searchResult",
};
// export const SCREENS_TO_RENDER = [HOME_SCREEN];

// export const REDIRECTION = {
//   [HOME_SCREEN]: "/",
//   [SEARCH_RESULT]: "/searchResult",
// };

export const ExpetedHeader = {
  user: ["Name", "Phone Number", "Address", "Email", "Role", "Parent Id"],
  master: ["Field", "Value", "Parent Id"],
  property: [
    "Property id",
    "City",
    "Location",
    "Plot Number",
    "Size",
    "Floor",
    "Accommodation",
    "Possession",
    "Price",
    "Facing",
    "Park Facing",
    "Corner",
    "Description",
    "1st Page Title",
    "2 Page Title",
    "Channel Partner Name",
    "Channel Contact Number",
    "Builder name",
    "Contact",
    "THUMBNAIL IMAGE NAME",
    "FOLDER NAME",
  ],
};
