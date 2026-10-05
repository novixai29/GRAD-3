/* =========================================================
   GRAD-003 — CREDITS 100%

   غيّر بيانات الزبون من هنا فقط.
========================================================= */

const GRADUATION = {

  /* =========================
     Graduate
  ========================= */

  graduateName:
    "Mohammed Ahmed",

  degree:
    "Bachelor of Medicine",

  faculty:
    "College of Medicine",

  department:
    "",

  university:
    "University of Mosul",

  classYear:
    "Class of 2027",

  honors:
    "",


  /* =========================
     Credits
  ========================= */

  requiredCredits:
    140,

  creditSteps:
    [
      32,
      58,
      81,
      106,
      128,
      140
    ],


  /* =========================
     Academic Journey
  ========================= */

  academicYears: [

    {
      number: "01",
      title: "YEAR 01",
      subtitle:
        "Foundation courses and the beginning of the academic journey.",
      credits: 32
    },

    {
      number: "02",
      title: "YEAR 02",
      subtitle:
        "Core academic requirements and advanced coursework.",
      credits: 58
    },

    {
      number: "03",
      title: "YEAR 03",
      subtitle:
        "Specialized study, practical work and deeper academic progress.",
      credits: 81
    },

    {
      number: "04",
      title: "FINAL YEAR",
      subtitle:
        "Final requirements, projects and examinations completed.",
      credits: 128
    },

    {
      number: "05",
      title: "GRADUATION",
      subtitle:
        "All academic requirements verified. Degree completed.",
      credits: 140,
      final: true
    }

  ],


  /* =========================
     Host
  ========================= */

  hostType:
    "graduate",

  hostName:
    "Mohammed Ahmed",


  /* =========================
     Message
  ========================= */

  tagline:
    "One chapter ends. Another begins.",


  /* =========================
     Ceremony Date
  ========================= */

  startAt:
    "2027-07-15T18:00:00+03:00",

  endAt:
    "2027-07-15T21:00:00+03:00",

  timeZone:
    "Asia/Baghdad",


  /*
    Used only for the visual
    ceremony progress bar.

    Example:
    academic completion date.
  */

  countdownStartAt:
    "2027-06-15T18:00:00+03:00",


  /* =========================
     Venue
  ========================= */

  venue:
    "Grand Celebration Hall",

  address:
    "Mosul, Nineveh",

  city:
    "Mosul",

  country:
    "Iraq",


  /* =========================
     URLs
  ========================= */

  mapsUrl:
    "",

  shareUrl:
    ""

};


/* =========================================================
   ELEMENTS
========================================================= */

const creditValue =
  document.getElementById(
    "creditValue"
  );

const totalCredits =
  document.getElementById(
    "totalCredits"
  );

const percentage =
  document.getElementById(
    "percentage"
  );

const progressCircle =
  document.getElementById(
    "progressCircle"
  );

const startButton =
  document.getElementById(
    "startButton"
  );

const systemLight =
  document.getElementById(
    "systemLight"
  );

const systemMessage =
  document.getElementById(
    "systemMessage"
  );

const completionBanner =
  document.getElementById(
    "completionBanner"
  );

const journeyTrack =
  document.getElementById(
    "journeyTrack"
  );

const journeyPrev =
  document.getElementById(
    "journeyPrev"
  );

const journeyNext =
  document.getElementById(
    "journeyNext"
  );

const journeyProgressBar =
  document.getElementById(
    "journeyProgressBar"
  );

const mapsButton =
  document.getElementById(
    "mapsButton"
  );

const calendarButton =
  document.getElementById(
    "calendarButton"
  );

const shareButton =
  document.getElementById(
    "shareButton"
  );

const shareFeedback =
  document.getElementById(
    "shareFeedback"
  );

const reducedMotion =
  window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;


/* =========================================================
   STATE
========================================================= */

let progressRunning =
  false;

let degreeCompleted =
  false;

let countdownInterval =
  null;


/* =========================================================
   SVG PROGRESS
========================================================= */

const ringRadius =
  128;

const ringCircumference =
  2 * Math.PI * ringRadius;


progressCircle.style.strokeDasharray =
  `${ringCircumference}`;


progressCircle.style.strokeDashoffset =
  `${ringCircumference}`;


/* =========================================================
   INIT
========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  initialize
);


function initialize() {

  applyData();

  buildAcademicJourney();

  setupDate();

  setupMaps();

  setupProgressButton();

  setupJourneyControls();

  setupCalendar();

  setupShare();

  setupScrollAnimations();

  updateCountdown();

  countdownInterval =
    window.setInterval(
      updateCountdown,
      1000
    );


  if (reducedMotion) {

    setDegreeProgress(
      GRADUATION.requiredCredits
    );

    completeDegreeState();

  }

}


/* =========================================================
   DYNAMIC DATA
========================================================= */

function applyData() {

  const fields = {

    graduateName:
      GRADUATION.graduateName,

    degree:
      GRADUATION.degree,

    faculty:
      GRADUATION.faculty,

    university:
      GRADUATION.university,

    classYear:
      GRADUATION.classYear,

    requiredCredits:
      GRADUATION.requiredCredits,

    venue:
      GRADUATION.venue,

    tagline:
      GRADUATION.tagline

  };


  Object.entries(fields)
    .forEach(
      ([key, value]) => {

        document
          .querySelectorAll(
            `[data-field="${key}"]`
          )
          .forEach(
            element => {

              element.textContent =
                value;

            }
          );

      }
    );


  totalCredits.textContent =
    GRADUATION.requiredCredits;


  document.title =
    `${GRADUATION.graduateName} — Degree Completed`;


  const ogTitle =
    document.querySelector(
      'meta[property="og:title"]'
    );


  const ogDescription =
    document.querySelector(
      'meta[property="og:description"]'
    );


  if (ogTitle) {

    ogTitle.setAttribute(
      "content",
      `${GRADUATION.graduateName} — Graduation Invitation`
    );

  }


  if (ogDescription) {

    ogDescription.setAttribute(
      "content",
      `${GRADUATION.requiredCredits} of ${GRADUATION.requiredCredits} credits completed. Celebrate the graduation of ${GRADUATION.graduateName}.`
    );

  }

}


/* =========================================================
   BUILD ACADEMIC JOURNEY
========================================================= */

function buildAcademicJourney() {

  journeyTrack.innerHTML =
    "";


  GRADUATION.academicYears
    .forEach(
      year => {

        const card =
          document.createElement(
            "article"
          );


        card.className =
          `journey-card${
            year.final
              ? " is-final"
              : ""
          }`;


        card.innerHTML = `
          <div>

            <div class="journey-card__top">

              <span class="journey-number">
                ${escapeHTML(year.number)}
              </span>

              <span class="journey-status">
                ${
                  year.final
                    ? "DEGREE COMPLETED"
                    : "COMPLETED"
                }
              </span>

            </div>

          </div>

          <div>

            <h3>
              ${escapeHTML(year.title)}
            </h3>

            <p>
              ${escapeHTML(year.subtitle)}
            </p>

          </div>

          <div class="journey-credit">

            <span>
              CUMULATIVE CREDITS
            </span>

            <strong>
              ${year.credits}
              /
              ${GRADUATION.requiredCredits}
            </strong>

          </div>
        `;


        journeyTrack.appendChild(
          card
        );

      }
    );

}


/* =========================================================
   START DEGREE PROCESS
========================================================= */

function setupProgressButton() {

  startButton.addEventListener(
    "click",
    () => {

      if (progressRunning) {
        return;
      }


      if (degreeCompleted) {

        replayDegreeProgress();

        return;
      }


      runDegreeProgress();

    }
  );

}


/* =========================================================
   MAIN CREDIT ANIMATION
========================================================= */

function runDegreeProgress() {

  if (
    reducedMotion ||
    typeof gsap === "undefined"
  ) {

    setDegreeProgress(
      GRADUATION.requiredCredits
    );

    completeDegreeState();

    return;

  }


  progressRunning =
    true;


  startButton.disabled =
    true;


  systemLight.classList.add(
    "is-processing"
  );


  systemMessage.textContent =
    "Reading academic credits...";


  const timeline =
    gsap.timeline({

      defaults: {
        ease:
          "power2.inOut"
      },

      onComplete: () => {

        progressRunning =
          false;

        degreeCompleted =
          true;

        startButton.disabled =
          false;

        startButton
          .querySelector("span")
          .textContent =
            "REPLAY DEGREE PROGRESS";

      }

    });


  let previousValue =
    0;


  GRADUATION.creditSteps
    .forEach(
      (value, index) => {

        const duration =
          index ===
          GRADUATION.creditSteps.length - 1
            ? 0.85
            : 0.65;


        const animationObject = {
          credits:
            previousValue
        };


        timeline.to(
          animationObject,
          {

            credits:
              value,

            duration,

            onStart: () => {

              systemMessage.textContent =
                getProgressMessage(
                  index
                );

            },

            onUpdate: () => {

              setDegreeProgress(
                Math.round(
                  animationObject.credits
                )
              );

            }

          }
        );


        previousValue =
          value;


        if (
          index <
          GRADUATION.creditSteps.length - 1
        ) {

          timeline.to(
            {},
            {
              duration: 0.12
            }
          );

        }

      }
    );


  timeline

    .call(
      completeDegreeState
    )

    .fromTo(
      completionBanner,
      {
        opacity: 0,
        y: 24,
        scale: 0.97
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease:
          "back.out(1.5)"
      }
    );

}


/* =========================================================
   DEGREE PROGRESS
========================================================= */

function setDegreeProgress(
  credits
) {

  const clamped =
    Math.min(
      GRADUATION.requiredCredits,
      Math.max(
        0,
        credits
      )
    );


  const percent =
    Math.round(
      (
        clamped /
        GRADUATION.requiredCredits
      ) *
      100
    );


  creditValue.textContent =
    clamped;


  percentage.textContent =
    `${percent}%`;


  const offset =
    ringCircumference -
    (
      percent /
      100
    ) *
    ringCircumference;


  progressCircle.style.strokeDashoffset =
    offset;

}


/* =========================================================
   COMPLETE STATE
========================================================= */

function completeDegreeState() {

  setDegreeProgress(
    GRADUATION.requiredCredits
  );


  systemLight.classList.remove(
    "is-processing"
  );


  systemLight.classList.add(
    "is-complete"
  );


  systemMessage.textContent =
    "Degree requirements verified.";


  completionBanner.style.opacity =
    "1";


  completionBanner.style.transform =
    "translateY(0)";


  degreeCompleted =
    true;

}


/* =========================================================
   REPLAY
========================================================= */

function replayDegreeProgress() {

  degreeCompleted =
    false;


  completionBanner.style.opacity =
    "0";


  completionBanner.style.transform =
    "translateY(20px)";


  systemLight.classList.remove(
    "is-complete"
  );


  systemMessage.textContent =
    "Academic record ready";


  setDegreeProgress(0);


  startButton
    .querySelector("span")
    .textContent =
      "PROCESS DEGREE CREDITS";


  runDegreeProgress();

}


/* =========================================================
   STATUS MESSAGES
========================================================= */

function getProgressMessage(
  index
) {

  const messages = [

    "Foundation credits verified...",

    "Core academic requirements verified...",

    "Major requirements verified...",

    "Advanced coursework verified...",

    "Final academic requirements verified...",

    "Completing degree record..."

  ];


  return (
    messages[index] ||
    "Processing academic record..."
  );

}


/* =========================================================
   JOURNEY NAVIGATION
========================================================= */

function setupJourneyControls() {

  journeyPrev.addEventListener(
    "click",
    () => {

      scrollJourney(
        -1
      );

    }
  );


  journeyNext.addEventListener(
    "click",
    () => {

      scrollJourney(
        1
      );

    }
  );


  journeyTrack.addEventListener(
    "scroll",
    updateJourneyProgress,
    {
      passive: true
    }
  );


  updateJourneyProgress();

}


function scrollJourney(
  direction
) {

  const card =
    journeyTrack.querySelector(
      ".journey-card"
    );


  if (!card) {
    return;
  }


  const distance =
    card.offsetWidth + 12;


  journeyTrack.scrollBy({
    left:
      direction *
      distance,

    behavior:
      reducedMotion
        ? "auto"
        : "smooth"
  });

}


function updateJourneyProgress() {

  const maxScroll =
    journeyTrack.scrollWidth -
    journeyTrack.clientWidth;


  let ratio = 0;


  if (
    maxScroll > 0
  ) {

    ratio =
      journeyTrack.scrollLeft /
      maxScroll;

  }


  const width =
    20 +
    (
      Math.abs(ratio) *
      80
    );


  journeyProgressBar.style.width =
    `${Math.min(
      100,
      Math.max(
        20,
        width
      )
    )}%`;

}


/* =========================================================
   DATE
========================================================= */

function setupDate() {

  const date =
    new Date(
      GRADUATION.startAt
    );


  if (
    Number.isNaN(
      date.getTime()
    )
  ) {

    return;
  }


  const monthFormatter =
    new Intl.DateTimeFormat(
      "en",
      {
        month: "short",
        timeZone:
          GRADUATION.timeZone
      }
    );


  const dayFormatter =
    new Intl.DateTimeFormat(
      "en",
      {
        day: "2-digit",
        timeZone:
          GRADUATION.timeZone
      }
    );


  const yearFormatter =
    new Intl.DateTimeFormat(
      "en",
      {
        year: "numeric",
        timeZone:
          GRADUATION.timeZone
      }
    );


  const fullDateFormatter =
    new Intl.DateTimeFormat(
      "en",
      {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
        timeZone:
          GRADUATION.timeZone
      }
    );


  const timeFormatter =
    new Intl.DateTimeFormat(
      "en",
      {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZone:
          GRADUATION.timeZone
      }
    );


  document.getElementById(
    "ceremonyMonth"
  ).textContent =
    monthFormatter
      .format(date)
      .toUpperCase();


  document.getElementById(
    "ceremonyDay"
  ).textContent =
    dayFormatter.format(date);


  document.getElementById(
    "ceremonyYear"
  ).textContent =
    yearFormatter.format(date);


  document.getElementById(
    "formattedDate"
  ).textContent =
    fullDateFormatter.format(date);


  document.getElementById(
    "formattedTime"
  ).textContent =
    timeFormatter.format(date);


  document.getElementById(
    "fullAddress"
  ).textContent =
    [
      GRADUATION.address,
      GRADUATION.country
    ]
      .filter(Boolean)
      .join(", ");

}


/* =========================================================
   COUNTDOWN
========================================================= */

function updateCountdown() {

  const eventStart =
    new Date(
      GRADUATION.startAt
    ).getTime();


  const eventEnd =
    new Date(
      GRADUATION.endAt
    ).getTime();


  const visualStart =
    new Date(
      GRADUATION.countdownStartAt
    ).getTime();


  const now =
    Date.now();


  if (
    Number.isNaN(eventStart) ||
    Number.isNaN(eventEnd)
  ) {

    return;
  }


  if (
    now >= eventEnd
  ) {

    setCountdownValues(
      0,
      0,
      0,
      0
    );


    setCeremonyProgress(
      100
    );


    clearInterval(
      countdownInterval
    );


    return;

  }


  if (
    now >= eventStart
  ) {

    setCountdownValues(
      0,
      0,
      0,
      0
    );


    setCeremonyProgress(
      100
    );


    return;

  }


  const difference =
    eventStart -
    now;


  const days =
    Math.floor(
      difference /
      86400000
    );


  const hours =
    Math.floor(
      (
        difference %
        86400000
      ) /
      3600000
    );


  const minutes =
    Math.floor(
      (
        difference %
        3600000
      ) /
      60000
    );


  const seconds =
    Math.floor(
      (
        difference %
        60000
      ) /
      1000
    );


  setCountdownValues(
    days,
    hours,
    minutes,
    seconds
  );


  let progress = 0;


  if (
    !Number.isNaN(visualStart) &&
    eventStart >
    visualStart
  ) {

    const fullDuration =
      eventStart -
      visualStart;


    const elapsed =
      now -
      visualStart;


    progress =
      (
        elapsed /
        fullDuration
      ) *
      100;

  }


  setCeremonyProgress(
    Math.min(
      100,
      Math.max(
        0,
        progress
      )
    )
  );

}


function setCountdownValues(
  days,
  hours,
  minutes,
  seconds
) {

  document.getElementById(
    "days"
  ).textContent =
    pad(days);


  document.getElementById(
    "hours"
  ).textContent =
    pad(hours);


  document.getElementById(
    "minutes"
  ).textContent =
    pad(minutes);


  document.getElementById(
    "seconds"
  ).textContent =
    pad(seconds);

}


function setCeremonyProgress(
  progress
) {

  const rounded =
    Math.round(
      progress
    );


  document.getElementById(
    "ceremonyPercentage"
  ).textContent =
    `${rounded}%`;


  document.getElementById(
    "timeProgressBar"
  ).style.width =
    `${rounded}%`;

}


function pad(
  number
) {

  return String(number)
    .padStart(
      2,
      "0"
    );

}


/* =========================================================
   MAPS
========================================================= */

function setupMaps() {

  mapsButton.href =
    getMapsUrl();

}


function getMapsUrl() {

  if (
    GRADUATION.mapsUrl &&
    GRADUATION.mapsUrl.trim()
  ) {

    return GRADUATION.mapsUrl;

  }


  const query =
    [
      GRADUATION.venue,
      GRADUATION.address,
      GRADUATION.city,
      GRADUATION.country
    ]
      .filter(Boolean)
      .join(", ");


  return (
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(query)
  );

}


/* =========================================================
   ICS CALENDAR
========================================================= */

function setupCalendar() {

  calendarButton.addEventListener(
    "click",
    downloadICS
  );

}


function downloadICS() {

  const start =
    new Date(
      GRADUATION.startAt
    );


  const end =
    new Date(
      GRADUATION.endAt
    );


  if (
    Number.isNaN(
      start.getTime()
    ) ||
    Number.isNaN(
      end.getTime()
    )
  ) {

    return;

  }


  const title =
    `${GRADUATION.graduateName} Graduation Celebration`;


  const location =
    [
      GRADUATION.venue,
      GRADUATION.address,
      GRADUATION.city,
      GRADUATION.country
    ]
      .filter(Boolean)
      .join(", ");


  const invitationUrl =
    getShareUrl();


  const description =
    [
      `Graduation celebration for ${GRADUATION.graduateName}.`,
      GRADUATION.degree,
      GRADUATION.university,
      invitationUrl
        ? `Invitation: ${invitationUrl}`
        : ""
    ]
      .filter(Boolean)
      .join("\\n");


  const file =
`BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//InviteUs//Credits100//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
UID:${Date.now()}@inviteus.party
DTSTAMP:${formatICSDate(new Date())}
DTSTART:${formatICSDate(start)}
DTEND:${formatICSDate(end)}
SUMMARY:${escapeICS(title)}
DESCRIPTION:${escapeICS(description)}
LOCATION:${escapeICS(location)}
URL:${escapeICS(invitationUrl)}
END:VEVENT
END:VCALENDAR`;


  const blob =
    new Blob(
      [file],
      {
        type:
          "text/calendar;charset=utf-8"
      }
    );


  const url =
    URL.createObjectURL(
      blob
    );


  const link =
    document.createElement(
      "a"
    );


  link.href =
    url;


  link.download =
    "graduation-celebration.ics";


  document.body.appendChild(
    link
  );


  link.click();


  link.remove();


  URL.revokeObjectURL(
    url
  );

}


function formatICSDate(
  date
) {

  return date
    .toISOString()
    .replace(
      /[-:]/g,
      ""
    )
    .replace(
      /\.\d{3}/,
      ""
    );

}


function escapeICS(
  value = ""
) {

  return String(value)

    .replace(
      /\\/g,
      "\\\\"
    )

    .replace(
      /,/g,
      "\\,"
    )

    .replace(
      /;/g,
      "\\;"
    )

    .replace(
      /\n/g,
      "\\n"
    );

}


/* =========================================================
   SHARE
========================================================= */

function setupShare() {

  shareButton.addEventListener(
    "click",
    shareInvitation
  );

}


async function shareInvitation() {

  const url =
    getShareUrl();


  const title =
    `${GRADUATION.graduateName} — Graduation Invitation`;


  const text =
    `${GRADUATION.requiredCredits} of ${GRADUATION.requiredCredits} credits completed. Join us in celebrating the graduation of ${GRADUATION.graduateName}, ${GRADUATION.classYear}.`;


  try {

    if (
      navigator.share
    ) {

      await navigator.share({
        title,
        text,
        url
      });


      showShareFeedback(
        "Invitation shared successfully."
      );


      return;

    }


    if (
      navigator.clipboard &&
      window.isSecureContext
    ) {

      await navigator.clipboard.writeText(
        url
      );


      showShareFeedback(
        "Invitation link copied."
      );


      return;

    }


    fallbackCopy(
      url
    );


    showShareFeedback(
      "Invitation link copied."
    );

  } catch (error) {

    if (
      error?.name ===
      "AbortError"
    ) {

      return;

    }


    try {

      fallbackCopy(
        url
      );


      showShareFeedback(
        "Invitation link copied."
      );

    } catch {

      showShareFeedback(
        "Copy the invitation URL from your browser."
      );

    }

  }

}


function getShareUrl() {

  if (
    GRADUATION.shareUrl &&
    GRADUATION.shareUrl.trim()
  ) {

    return GRADUATION.shareUrl;

  }


  return window.location.href;

}


function fallbackCopy(
  text
) {

  const textarea =
    document.createElement(
      "textarea"
    );


  textarea.value =
    text;


  textarea.setAttribute(
    "readonly",
    ""
  );


  textarea.style.position =
    "fixed";


  textarea.style.opacity =
    "0";


  document.body.appendChild(
    textarea
  );


  textarea.select();


  document.execCommand(
    "copy"
  );


  textarea.remove();

}


function showShareFeedback(
  message
) {

  shareFeedback.textContent =
    message;


  window.clearTimeout(
    showShareFeedback.timer
  );


  showShareFeedback.timer =
    window.setTimeout(
      () => {

        shareFeedback.textContent =
          "";

      },
      3500
    );

}


/* =========================================================
   SCROLLTRIGGER
========================================================= */

function setupScrollAnimations() {

  if (
    reducedMotion ||
    typeof gsap ===
      "undefined"
  ) {

    return;

  }


  if (
    typeof ScrollTrigger !==
    "undefined"
  ) {

    gsap.registerPlugin(
      ScrollTrigger
    );

  }


  gsap.utils
    .toArray(
      ".record-cell"
    )
    .forEach(
      (element) => {

        gsap.from(
          element,
          {

            y: 24,

            opacity: 0,

            duration: 0.65,

            scrollTrigger: {
              trigger:
                element,

              start:
                "top 90%",

              once:
                true
            }

          }
        );

      }
    );


  gsap.from(
    ".statement-number",
    {

      scale: 0.84,

      opacity: 0.25,

      duration: 0.9,

      scrollTrigger: {

        trigger:
          ".statement",

        start:
          "top 70%",

        once:
          true

      }

    }
  );

}


/* =========================================================
   UTILITIES
========================================================= */

function escapeHTML(
  value = ""
) {

  return String(value)

    .replace(
      /&/g,
      "&amp;"
    )

    .replace(
      /</g,
      "&lt;"
    )

    .replace(
      />/g,
      "&gt;"
    )

    .replace(
      /"/g,
      "&quot;"
    )

    .replace(
      /'/g,
      "&#039;"
    );

}
