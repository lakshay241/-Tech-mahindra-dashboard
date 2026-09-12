"use strict";


/* =========================================================
   TECH MAHINDRA DASHBOARD
   UNIVERSAL HOVER INFORMATION SYSTEM
========================================================= */


document.addEventListener("DOMContentLoaded", function () {

    /* USER */

    loadUser();


    /* GRAPH */

    createRevenueTooltip();


    /* ALL DASHBOARD TOOLTIPS */

    setupKpiTooltips();

    setupSystemStatusTooltip();

    setupHealthTooltips();

    setupActivityTooltips();

    setupRegionalTooltips();

    setupSidebarTooltips();

    setupProfileTooltip();


    /* INTERACTIONS */

    setupKpiCards();

    setupSidebar();

    setupSearch();

    setupChartSelect();

});



/* =========================================================
   USER INFORMATION
========================================================= */

function loadUser() {

    const user =
        typeof getLoggedInUser === "function"
            ? getLoggedInUser()
            : null;


    if (!user) {
        return;
    }


    const userName =
        document.getElementById("userName");


    const welcomeName =
        document.getElementById("welcomeName");


    const footerUser =
        document.getElementById("footerUser");


    if (userName) {
        userName.textContent =
            user.name;
    }


    if (welcomeName) {
        welcomeName.textContent =
            user.name;
    }


    if (footerUser) {
        footerUser.textContent =
            user.name;
    }

}



/* =========================================================
   UNIVERSAL TOOLTIP
========================================================= */

function createUniversalTooltip() {

    let tooltip =
        document.getElementById(
            "dashboardTooltip"
        );


    if (tooltip) {
        return tooltip;
    }


    tooltip =
        document.createElement("div");


    tooltip.id =
        "dashboardTooltip";


    tooltip.innerHTML = `

        <div class="dashboard-tooltip-title"></div>

        <div class="dashboard-tooltip-value"></div>

        <div class="dashboard-tooltip-divider"></div>

        <div class="dashboard-tooltip-content"></div>

    `;


    document.body.appendChild(
        tooltip
    );


    const style =
        document.createElement("style");


    style.id =
        "dashboardTooltipStyle";


    style.textContent = `

        #dashboardTooltip {

            position: fixed;

            z-index: 999999;

            width: 245px;

            padding: 16px 17px;

            border-radius: 15px;

            background:
                linear-gradient(
                    145deg,
                    rgba(7, 39, 59, 0.98),
                    rgba(2, 18, 30, 0.98)
                );

            border:
                1px solid
                rgba(0, 217, 255, 0.38);

            box-shadow:
                0 20px 50px
                rgba(0,0,0,0.48),

                0 0 30px
                rgba(0,217,255,0.08);

            backdrop-filter:
                blur(14px);

            -webkit-backdrop-filter:
                blur(14px);

            pointer-events:
                none;

            opacity:
                0;

            transform:
                translate3d(0, 8px, 0)
                scale(.96);

            transition:
                opacity .16s ease,
                transform .16s ease;

            font-family:
                Inter,
                "Segoe UI",
                Arial,
                sans-serif;

        }


        #dashboardTooltip.show {

            opacity:
                1;

            transform:
                translate3d(0,0,0)
                scale(1);

        }


        .dashboard-tooltip-title {

            color:
                #6e91a5;

            font-size:
                9px;

            font-weight:
                800;

            letter-spacing:
                1.8px;

            text-transform:
                uppercase;

            margin-bottom:
                5px;

        }


        .dashboard-tooltip-value {

            color:
                #f3f9fc;

            font-size:
                22px;

            font-weight:
                800;

            letter-spacing:
                -.5px;

            margin-bottom:
                3px;

        }


        .dashboard-tooltip-divider {

            width:
                100%;

            height:
                1px;

            margin:
                11px 0;

            background:
                rgba(110,180,210,.13);

        }


        .dashboard-tooltip-content {

            color:
                #91a9b7;

            font-size:
                11px;

            line-height:
                1.75;

        }


        .dashboard-tooltip-content b {

            color:
                #dce9ef;

            font-weight:
                700;

        }


        .dashboard-tooltip-content .good {

            color:
                #37e6a0;

        }


        .dashboard-tooltip-content .cyan {

            color:
                #55e8ff;

        }


        .dashboard-tooltip-content .warning {

            color:
                #ffc857;

        }


        .dashboard-tooltip-content .danger {

            color:
                #ff6575;

        }


        [data-tooltip-info] {

            cursor:
                help;

        }

    `;


    document.head.appendChild(
        style
    );


    return tooltip;

}



/* =========================================================
   SHOW UNIVERSAL TOOLTIP
========================================================= */

function showUniversalTooltip(
    title,
    value,
    content,
    event
) {

    const tooltip =
        createUniversalTooltip();


    tooltip.querySelector(
        ".dashboard-tooltip-title"
    ).textContent =
        title;


    tooltip.querySelector(
        ".dashboard-tooltip-value"
    ).textContent =
        value;


    tooltip.querySelector(
        ".dashboard-tooltip-content"
    ).innerHTML =
        content;


    tooltip.classList.add(
        "show"
    );


    moveUniversalTooltip(
        tooltip,
        event
    );

}



/* =========================================================
   MOVE UNIVERSAL TOOLTIP
========================================================= */

function moveUniversalTooltip(
    tooltip,
    event
) {

    const gap = 18;

    let x =
        event.clientX + gap;

    let y =
        event.clientY + gap;


    const rect =
        tooltip.getBoundingClientRect();


    if (
        x + rect.width >
        window.innerWidth - 10
    ) {

        x =
            event.clientX -
            rect.width -
            gap;

    }


    if (
        y + rect.height >
        window.innerHeight - 10
    ) {

        y =
            event.clientY -
            rect.height -
            gap;

    }


    tooltip.style.left =
        `${Math.max(8, x)}px`;


    tooltip.style.top =
        `${Math.max(8, y)}px`;

}



/* =========================================================
   HIDE UNIVERSAL TOOLTIP
========================================================= */

function hideUniversalTooltip() {

    const tooltip =
        document.getElementById(
            "dashboardTooltip"
        );


    if (tooltip) {

        tooltip.classList.remove(
            "show"
        );

    }

}



/* =========================================================
   GENERIC TOOLTIP BINDER
========================================================= */

function bindTooltip(
    element,
    title,
    value,
    content
) {

    if (!element) {
        return;
    }


    element.setAttribute(
        "data-tooltip-info",
        "true"
    );


    element.addEventListener(
        "mouseenter",
        function (event) {

            showUniversalTooltip(
                title,
                value,
                content,
                event
            );

        }
    );


    element.addEventListener(
        "mousemove",
        function (event) {

            const tooltip =
                document.getElementById(
                    "dashboardTooltip"
                );


            if (tooltip) {

                moveUniversalTooltip(
                    tooltip,
                    event
                );

            }

        }
    );


    element.addEventListener(
        "mouseleave",
        hideUniversalTooltip
    );

}



/* =========================================================
   KPI TOOLTIPS
========================================================= */

function setupKpiTooltips() {

    const cards =
        document.querySelectorAll(
            ".kpi-card"
        );


    const information = [

        {
            title: "ACTIVE PROJECTS",
            value: "128",
            content:
                `
                <b class="cyan">128 active projects</b><br>
                Portfolio increased by <b class="good">12.8%</b><br>
                compared with last month.<br>
                Current enterprise delivery pipeline is strong.
                `
        },

        {
            title: "REVENUE",
            value: "₹84.6Cr",
            content:
                `
                Quarterly revenue is
                <b class="cyan">₹84.6 Crore</b>.<br>
                Current quarter growth:
                <b class="good">+8.4%</b><br>
                Performance remains above target.
                `
        },

        {
            title: "CLIENTS",
            value: "342",
            content:
                `
                <b class="cyan">342 enterprise clients</b><br>
                Active customer portfolio is growing.<br>
                Client retention remains stable.
                `
        },

        {
            title: "SUCCESS RATE",
            value: "96.8%",
            content:
                `
                Delivery success rate:
                <b class="good">96.8%</b><br>
                Projects meeting operational targets.<br>
                Overall delivery health is excellent.
                `

        }

    ];


    cards.forEach(
        function (card, index) {

            const data =
                information[index];


            if (data) {

                bindTooltip(
                    card,
                    data.title,
                    data.value,
                    data.content
                );

            }

        }
    );

}



/* =========================================================
   SYSTEM STATUS TOOLTIP
========================================================= */

function setupSystemStatusTooltip() {

    const status =
        document.querySelector(
            ".system-status"
        );


    if (!status) {
        return;
    }


    bindTooltip(

        status,

        "SYSTEM STATUS",

        "ALL SYSTEMS OPERATIONAL",

        `
        <b class="good">● All systems operational</b><br>
        Core enterprise services are running normally.<br>
        No critical incidents detected.<br>
        Monitoring status: <b>LIVE</b>
        `

    );

}



/* =========================================================
   PROJECT HEALTH TOOLTIPS
========================================================= */

function setupHealthTooltips() {

    const healthItems =
        document.querySelectorAll(
            ".health-item"
        );


    const data = [

        {
            title: "HEALTHY PROJECTS",
            value: "82%",
            content:
                `
                <b class="good">Healthy</b> project portfolio.<br>
                Delivery is currently on schedule.<br>
                No immediate intervention required.
                `
        },

        {
            title: "PROJECTS AT RISK",
            value: "12%",
            content:
                `
                <b class="warning">At-risk projects</b> require
                monitoring.<br>
                Teams are reviewing delivery timelines.
                `
        },

        {
            title: "CRITICAL PROJECTS",
            value: "6%",
            content:
                `
                <b class="danger">Critical projects</b> need
                immediate attention.<br>
                Escalation and recovery plans are active.
                `
        }

    ];


    healthItems.forEach(
        function (item, index) {

            const info =
                data[index];


            if (info) {

                bindTooltip(
                    item,
                    info.title,
                    info.value,
                    info.content
                );

            }

        }
    );

}



/* =========================================================
   RECENT ACTIVITY TOOLTIPS
========================================================= */

function setupActivityTooltips() {

    const activities =
        document.querySelectorAll(
            ".activity-item"
        );


    activities.forEach(
        function (item, index) {

            const titleElement =
                item.querySelector(
                    "strong"
                );


            const title =
                titleElement
                    ? titleElement.textContent
                    : "ENTERPRISE ACTIVITY";


            const activityDetails = [

                "Project milestone successfully completed.",
                "New enterprise deployment completed.",
                "Analytics report generated successfully.",
                "Operations team updated project status.",
                "Client delivery checkpoint completed.",
                "Infrastructure monitoring event processed."

            ];


            const detail =
                activityDetails[
                    index %
                    activityDetails.length
                ];


            bindTooltip(

                item,

                "RECENT ACTIVITY",

                title,

                `
                ${detail}<br>
                Event processed successfully.<br>
                <b class="cyan">System status: LIVE</b>
                `

            );

        }
    );

}



/* =========================================================
   REGIONAL PERFORMANCE TOOLTIPS
========================================================= */

function setupRegionalTooltips() {

    const regions =
        document.querySelectorAll(
            ".regional-item"
        );


    regions.forEach(
        function (item) {

            const nameElement =
                item.querySelector(
                    ".regional-name"
                );


            const valueElement =
                item.querySelector(
                    "strong"
                );


            const name =
                nameElement
                    ? nameElement.textContent
                    : "REGION";


            const value =
                valueElement
                    ? valueElement.textContent
                    : "—";


            bindTooltip(

                item,

                "REGIONAL PERFORMANCE",

                `${name} · ${value}`,

                `
                Regional delivery performance:
                <b class="good">${value}</b><br>
                Current operational efficiency is being
                monitored in real time.<br>
                <b class="cyan">Performance tracking: ACTIVE</b>
                `

            );

        }
    );

}



/* =========================================================
   SIDEBAR TOOLTIP
========================================================= */

function setupSidebarTooltips() {

    const items =
        document.querySelectorAll(
            ".menu-item"
        );


    const descriptions = {

        "Dashboard":
            "Main enterprise command center with live KPIs and operational overview.",

        "Projects":
            "Track active projects, milestones, delivery progress and project health.",

        "Analytics":
            "Review business analytics, trends, revenue and performance insights.",

        "Operations":
            "Monitor operational systems, deployments and enterprise activities.",

        "Team":
            "View team activity, workforce information and operational assignments.",

        "Settings":
            "Manage dashboard preferences and enterprise configuration."

    };


    items.forEach(
        function (item) {

            const text =
                item.textContent
                    .replace(
                        /[^a-zA-Z ]/g,
                        ""
                    )
                    .trim();


            let description =
                "Enterprise dashboard section.";


            Object.keys(
                descriptions
            ).forEach(
                function (key) {

                    if (
                        text
                            .toLowerCase()
                            .includes(
                                key.toLowerCase()
                            )
                    ) {

                        description =
                            descriptions[key];

                    }

                }
            );


            bindTooltip(

                item,

                "CONTROL PANEL",

                text || "Dashboard",

                `
                ${description}<br>
                <b class="cyan">
                    Select to explore this section.
                </b>
                `

            );

        }
    );

}



/* =========================================================
   PROFILE TOOLTIP
========================================================= */

function setupProfileTooltip() {

    const profile =
        document.querySelector(
            ".profile"
        );


    if (!profile) {
        return;
    }


    const user =
        typeof getLoggedInUser === "function"
            ? getLoggedInUser()
            : null;


    const name =
        user && user.name
            ? user.name
            : "Lakshay";


    bindTooltip(

        profile,

        "USER PROFILE",

        name,

        `
        <b class="cyan">
            ${name}
        </b><br>
        Role: <b>Administrator</b><br>
        Session: <b class="good">Authenticated</b><br>
        Access level: <b>Enterprise</b>
        `

    );

}



/* =========================================================
   REVENUE GRAPH
========================================================= */

const revenueData = [

    {
        month: "April",
        revenue: "₹45Cr",
        growth: "+4.2%",
        status: "Stable",
        projects: "104"
    },

    {
        month: "May",
        revenue: "₹58Cr",
        growth: "+7.8%",
        status: "Growing",
        projects: "110"
    },

    {
        month: "June",
        revenue: "₹52Cr",
        growth: "-2.4%",
        status: "Normal",
        projects: "113"
    },

    {
        month: "July",
        revenue: "₹71Cr",
        growth: "+11.6%",
        status: "Strong",
        projects: "118"
    },

    {
        month: "August",
        revenue: "₹78Cr",
        growth: "+9.9%",
        status: "Excellent",
        projects: "123"
    },

    {
        month: "September",
        revenue: "₹88Cr",
        growth: "+12.8%",
        status: "Excellent",
        projects: "128"
    }

];



/* =========================================================
   GRAPH TOOLTIP
========================================================= */

function createRevenueTooltip() {

    const chart =
        document.querySelector(
            ".chart"
        );


    const bars =
        document.querySelectorAll(
            ".bar-wrapper"
        );


    if (!chart || !bars.length) {
        return;
    }


    const tooltip =
        document.createElement(
            "div"
        );


    tooltip.className =
        "revenue-tooltip";


    tooltip.innerHTML = `

        <div class="tooltip-month">
            September
        </div>

        <div class="tooltip-revenue">
            ₹88Cr
        </div>

        <div class="tooltip-divider"></div>

        <div class="tooltip-row">
            <span>Growth</span>
            <strong>+12.8%</strong>
        </div>

        <div class="tooltip-row">
            <span>Projects</span>
            <strong>128</strong>
        </div>

        <div class="tooltip-row">
            <span>Status</span>
            <strong>Excellent</strong>
        </div>

    `;


    document.body.appendChild(
        tooltip
    );


    const style =
        document.createElement(
            "style"
        );


    style.textContent = `

        .revenue-tooltip {

            position: fixed;

            z-index: 999998;

            min-width: 190px;

            padding: 15px 16px;

            border-radius: 14px;

            background:
                linear-gradient(
                    145deg,
                    rgba(7,36,55,.98),
                    rgba(2,18,30,.98)
                );

            border:
                1px solid
                rgba(0,217,255,.38);

            box-shadow:
                0 18px 45px
                rgba(0,0,0,.45),

                0 0 25px
                rgba(0,217,255,.08);

            backdrop-filter:
                blur(14px);

            pointer-events:
                none;

            opacity:
                0;

            transform:
                translate3d(0,6px,0)
                scale(.96);

            transition:
                opacity .16s ease,
                transform .16s ease;

        }


        .revenue-tooltip.visible {

            opacity:
                1;

            transform:
                translate3d(0,0,0)
                scale(1);

        }


        .tooltip-month {

            color:
                #83a5b7;

            font-size:
                10px;

            font-weight:
                800;

            letter-spacing:
                1.5px;

            text-transform:
                uppercase;

        }


        .tooltip-revenue {

            color:
                #f4fbff;

            font-size:
                25px;

            font-weight:
                800;

            margin-top:
                3px;

        }


        .tooltip-divider {

            height:
                1px;

            margin:
                10px 0;

            background:
                rgba(120,190,220,.13);

        }


        .tooltip-row {

            display:
                flex;

            justify-content:
                space-between;

            gap:
                22px;

            margin-top:
                6px;

            font-size:
                10px;

        }


        .tooltip-row span {
            color:
                #718c9d;
        }


        .tooltip-row strong {
            color:
                #dceaf1;
        }


    `;


    document.head.appendChild(
        style
    );


    bars.forEach(
        function (bar, index) {

            const data =
                revenueData[index];


            if (!data) {
                return;
            }


            bar.addEventListener(
                "mouseenter",
                function () {

                    tooltip.querySelector(
                        ".tooltip-month"
                    ).textContent =
                        data.month;


                    tooltip.querySelector(
                        ".tooltip-revenue"
                    ).textContent =
                        data.revenue;


                    const rows =
                        tooltip.querySelectorAll(
                            ".tooltip-row strong"
                        );


                    rows[0].textContent =
                        data.growth;

                    rows[1].textContent =
                        data.projects;

                    rows[2].textContent =
                        data.status;


                    tooltip.classList.add(
                        "visible"
                    );

                }
            );


            bar.addEventListener(
                "mousemove",
                function (event) {

                    moveRevenueTooltip(
                        tooltip,
                        event
                    );

                }
            );


            bar.addEventListener(
                "mouseleave",
                function () {

                    tooltip.classList.remove(
                        "visible"
                    );

                }
            );

        }
    );

}



/* =========================================================
   MOVE GRAPH TOOLTIP
========================================================= */

function moveRevenueTooltip(
    tooltip,
    event
) {

    const gap = 18;

    let x =
        event.clientX + gap;

    let y =
        event.clientY + gap;


    const rect =
        tooltip.getBoundingClientRect();


    if (
        x + rect.width >
        window.innerWidth - 10
    ) {

        x =
            event.clientX -
            rect.width -
            gap;

    }


    if (
        y + rect.height >
        window.innerHeight - 10
    ) {

        y =
            event.clientY -
            rect.height -
            gap;

    }


    tooltip.style.left =
        `${x}px`;

    tooltip.style.top =
        `${y}px`;

}



/* =========================================================
   KPI 3D EFFECT
========================================================= */

function setupKpiCards() {

    const cards =
        document.querySelectorAll(
            ".kpi-card"
        );


    cards.forEach(
        function (card) {

            card.addEventListener(
                "mousemove",
                function (event) {

                    const rect =
                        card.getBoundingClientRect();


                    const x =
                        event.clientX -
                        rect.left;


                    const y =
                        event.clientY -
                        rect.top;


                    const centerX =
                        rect.width / 2;


                    const centerY =
                        rect.height / 2;


                    const rotateY =
                        ((x - centerX) /
                        centerX) * 2;


                    const rotateX =
                        -((y - centerY) /
                        centerY) * 2;


                    card.style.transform =
                        `
                        perspective(800px)
                        rotateX(${rotateX}deg)
                        rotateY(${rotateY}deg)
                        translateY(-5px)
                        `;

                }
            );


            card.addEventListener(
                "mouseleave",
                function () {

                    card.style.transform =
                        "";

                }
            );

        }
    );

}



/* =========================================================
   SIDEBAR ACTIVE ITEM
========================================================= */

function setupSidebar() {

    const menuItems =
        document.querySelectorAll(
            ".menu-item"
        );


    menuItems.forEach(
        function (item) {

            item.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();


                    menuItems.forEach(
                        function (menu) {

                            menu.classList.remove(
                                "active"
                            );

                        }
                    );


                    item.classList.add(
                        "active"
                    );

                }
            );

        }
    );

}



/* =========================================================
   SEARCH
========================================================= */

function setupSearch() {

    const input =
        document.querySelector(
            ".search-box input"
        );


    if (!input) {
        return;
    }


    input.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Enter"
            ) {

                const query =
                    input.value.trim();


                if (!query) {
                    return;
                }


                showSearchMessage(
                    query
                );

            }

        }
    );

}



/* =========================================================
   SEARCH MESSAGE
========================================================= */

function showSearchMessage(
    query
) {

    const message =
        document.createElement(
            "div"
        );


    message.textContent =
        `Searching for "${query}"...`;


    message.style.cssText = `

        position: fixed;

        top: 150px;

        right: 30px;

        z-index: 999999;

        padding: 12px 17px;

        border-radius: 12px;

        background:
            rgba(5,27,42,.97);

        border:
            1px solid
            rgba(0,217,255,.25);

        color:
            #9bb3c1;

        font-size:
            11px;

        box-shadow:
            0 15px 35px
            rgba(0,0,0,.35);

    `;


    document.body.appendChild(
        message
    );


    setTimeout(
        function () {

            message.remove();

        },
        1800
    );

}



/* =========================================================
   CHART SELECT
========================================================= */

function setupChartSelect() {

    const select =
        document.querySelector(
            ".chart-select"
        );


    if (!select) {
        return;
    }


    select.addEventListener(
        "change",
        function () {

            if (
                select.value ===
                "Last Year"
            ) {

                showSearchMessage(
                    "Yearly performance data"
                );

            } else {

                showSearchMessage(
                    "Last 6 months performance"
                );

            }

        }
    );

}