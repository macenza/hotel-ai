import React, { useRef, useState } from "react";
import {
  Send,
  Trash2,
  X,
  Sparkles,
  Bot,
  Hotel,
  Users,
  CalendarCheck,
  Star,
  BedDouble,
  UserRound,
  TrendingUp,
  ChevronRight,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import { sendChatMessage } from "../services/api";

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Hi! I'm your Hotel AI Assistant. How can I help you today?",
    },
  ]);

  const [position, setPosition] = useState(null);

  const drag = useRef({
    active: false,
    offsetX: 0,
    offsetY: 0,
  });

  // =====================================================
  // QUICK QUESTIONS
  // =====================================================

  const suggestions = [
    {
      text: "How many bookings are there?",
      icon: CalendarCheck,
      label: "Bookings",
    },
    {
      text: "How many customers are there?",
      icon: Users,
      label: "Customers",
    },
    {
      text: "How many reviews are there?",
      icon: Star,
      label: "Reviews",
    },
    {
      text: "How many rooms are there?",
      icon: BedDouble,
      label: "Rooms",
    },
    {
      text: "How many staff members are there?",
      icon: UserRound,
      label: "Staff",
    },
    {
      text: "What is the hotel's current revenue?",
      icon: TrendingUp,
      label: "Revenue",
    },
  ];

  // =====================================================
  // CLEAR CHAT
  // =====================================================

  const handleDelete = () => {
    setMessages([]);
  };

  // =====================================================
  // SEND MESSAGE
  // =====================================================

  const sendMessage = async (text = message) => {
    const value = text.trim();

    if (!value || isLoading) return;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: "user",
        text: value,
      },
    ]);

    setMessage("");
    setIsLoading(true);

    try {
      const result = await sendChatMessage(value);

      const botReply =
        result.message ||
        result.response ||
        result.answer ||
        "Sorry, I could not understand your request.";

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "bot",
          text: botReply,
        },
      ]);
    } catch (error) {
      console.error("Chatbot error:", error);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "bot",
          text: "Sorry, I couldn't connect to the hotel database. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // =====================================================
  // ENTER KEY
  // =====================================================

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // =====================================================
  // DRAG
  // =====================================================

  const startDrag = (e) => {
    if (e.button !== 0) return;

    const box = e.currentTarget.closest(".hotel-chatbot");

    if (!box) return;

    const rect = box.getBoundingClientRect();

    drag.current = {
      active: true,
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top,
    };

    document.body.style.userSelect = "none";

    window.addEventListener("mousemove", moveDrag);
    window.addEventListener("mouseup", stopDrag);
  };

  const moveDrag = (e) => {
    if (!drag.current.active) return;

    const boxWidth = 430;
    const boxHeight = 700;

    const x = Math.max(
      10,
      Math.min(
        e.clientX - drag.current.offsetX,
        window.innerWidth - boxWidth - 10
      )
    );

    const y = Math.max(
      10,
      Math.min(
        e.clientY - drag.current.offsetY,
        window.innerHeight - boxHeight - 10
      )
    );

    setPosition({ x, y });
  };

  const stopDrag = () => {
    drag.current.active = false;

    document.body.style.userSelect = "";

    window.removeEventListener("mousemove", moveDrag);
    window.removeEventListener("mouseup", stopDrag);
  };

  const chatbotStyle = position
    ? {
        left: `${position.x}px`,
        top: `${position.y}px`,
        right: "auto",
        bottom: "auto",
      }
    : {};

  return (
    <>
      {/* =====================================================
          FLOATING HOTEL ROBOT BUTTON
      ===================================================== */}

      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open Hotel AI Assistant"
          className="
            fixed bottom-7 right-7 z-[9999]
            group
            h-[76px] w-[76px]
            rounded-[25px]
            transition-all duration-300
            hover:-translate-y-2 hover:scale-105
            active:scale-95
          "
        >
          {/* Outer Glow */}
          <div
            className="
              absolute inset-0
              rounded-[25px]
              bg-blue-500/40
              blur-2xl
              opacity-70
              transition
              group-hover:opacity-100
            "
          />

          {/* Main Button */}
          <div
            className="
              relative
              flex h-full w-full
              items-center justify-center
              overflow-hidden
              rounded-[25px]
              border border-white/30
              bg-gradient-to-br
              from-slate-950
              via-blue-900
              to-blue-600
              text-white
              shadow-[0_18px_45px_rgba(30,64,175,0.40)]
            "
          >
            {/* Shine */}
            <div
              className="
                absolute -left-10 -top-10
                h-20 w-20
                rounded-full
                bg-cyan-300/20
                blur-2xl
              "
            />

            {/* Robot Face */}
            <div
              className="
                relative
                flex h-[48px] w-[48px]
                items-center justify-center
                rounded-[17px]
                border border-white/20
                bg-white/10
                shadow-inner
                backdrop-blur-md
              "
            >
              <Bot
                size={31}
                strokeWidth={1.6}
                className="relative z-10"
              />

              {/* Robot antenna */}
              <span
                className="
                  absolute -top-[7px] left-1/2
                  h-2 w-2
                  -translate-x-1/2
                  rounded-full
                  bg-cyan-300
                  shadow-[0_0_10px_rgba(103,232,249,0.9)]
                "
              />
            </div>

            {/* Online */}
            <span
              className="
                absolute right-1.5 top-1.5
                h-4 w-4
                rounded-full
                border-[3px]
                border-blue-900
                bg-emerald-400
                shadow-[0_0_12px_rgba(52,211,153,0.8)]
              "
            />
          </div>

          {/* Tooltip */}
          <div
            className="
              pointer-events-none
              absolute right-full top-1/2
              mr-3
              -translate-y-1/2
              translate-x-2
              whitespace-nowrap
              rounded-xl
              border border-slate-200
              bg-white
              px-3 py-2
              text-[11px]
              font-semibold
              text-slate-700
              opacity-0
              shadow-xl
              transition-all duration-200
              group-hover:translate-x-0
              group-hover:opacity-100
            "
          >
            Ask Hotel AI
          </div>
        </button>
      )}

      {/* =====================================================
          CHAT WINDOW
      ===================================================== */}

      {isOpen && (
        <div
          style={chatbotStyle}
          className="
            hotel-chatbot
            fixed bottom-6 right-6 z-[9999]

            flex
            h-[700px]
            w-[430px]
            max-h-[calc(100vh-24px)]
            max-w-[calc(100vw-24px)]
            flex-col

            overflow-hidden
            rounded-[30px]

            border
            border-slate-200

            bg-white

            shadow-[0_30px_100px_rgba(15,23,42,0.30)]

            animate-[chatOpen_0.28s_ease-out]
          "
        >
          {/* =====================================================
              HEADER
          ===================================================== */}

          <div
            onMouseDown={startDrag}
            className="
              relative
              shrink-0
              cursor-move
              overflow-hidden
              bg-gradient-to-br
              from-[#020617]
              via-[#0f2b68]
              to-[#2563eb]
              px-5
              pb-5
              pt-5
              text-white
            "
          >
            {/* Background decorations */}

            <div
              className="
                absolute
                -right-16
                -top-20
                h-48
                w-48
                rounded-full
                bg-cyan-400/15
                blur-3xl
              "
            />

            <div
              className="
                absolute
                -bottom-20
                -left-16
                h-48
                w-48
                rounded-full
                bg-indigo-500/25
                blur-3xl
              "
            />

            <div
              className="
                absolute
                right-24
                top-4
                h-1
                w-1
                rounded-full
                bg-cyan-300
                shadow-[0_0_14px_rgba(103,232,249,1)]
              "
            />

            <div className="relative flex items-center justify-between">
              {/* Brand */}

              <div className="flex items-center gap-3">
                {/* Robot Icon */}

                <div
                  className="
                    relative
                    flex h-[54px] w-[54px]
                    shrink-0
                    items-center justify-center
                    rounded-[18px]
                    border border-white/20
                    bg-white/10
                    shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]
                    backdrop-blur-md
                  "
                >
                  <Bot
                    size={30}
                    strokeWidth={1.55}
                    className="relative z-10"
                  />

                  <span
                    className="
                      absolute
                      -top-1
                      left-1/2
                      h-2
                      w-2
                      -translate-x-1/2
                      rounded-full
                      bg-cyan-300
                      shadow-[0_0_10px_rgba(103,232,249,0.9)]
                    "
                  />

                  <span
                    className="
                      absolute
                      bottom-2
                      left-2
                      h-1.5
                      w-1.5
                      rounded-full
                      bg-emerald-400
                    "
                  />

                  <span
                    className="
                      absolute
                      bottom-2
                      right-2
                      h-1.5
                      w-1.5
                      rounded-full
                      bg-emerald-400
                    "
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-[16px] font-bold tracking-tight">
                      Hotel AI
                    </h2>

                    <div
                      className="
                        flex items-center gap-1
                        rounded-full
                        border border-cyan-300/20
                        bg-cyan-300/10
                        px-2 py-0.5
                      "
                    >
                      <Sparkles
                        size={10}
                        className="text-cyan-300"
                      />

                      <span className="text-[8px] font-bold uppercase tracking-wider text-cyan-200">
                        AI
                      </span>
                    </div>
                  </div>

                  <div className="mt-1.5 flex items-center gap-1.5">
                    <span
                      className="
                        h-2
                        w-2
                        rounded-full
                        bg-emerald-400
                        shadow-[0_0_8px_rgba(52,211,153,0.8)]
                      "
                    />

                    <span className="text-[10px] font-medium text-blue-100">
                      Online • Hotel Intelligence Assistant
                    </span>
                  </div>
                </div>
              </div>

              {/* Controls */}

              <div className="flex items-center gap-1.5">
                <button
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={handleDelete}
                  title="Clear chat"
                  className="
                    flex h-9 w-9
                    items-center justify-center
                    rounded-xl
                    border border-white/10
                    bg-white/5
                    text-blue-100
                    transition-all
                    hover:bg-white/15
                    hover:text-white
                  "
                >
                  <Trash2 size={16} strokeWidth={1.8} />
                </button>

                <button
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={() => setIsOpen(false)}
                  title="Close"
                  className="
                    flex h-9 w-9
                    items-center justify-center
                    rounded-xl
                    border border-white/10
                    bg-white/5
                    text-blue-100
                    transition-all
                    hover:bg-white/15
                    hover:text-white
                  "
                >
                  <X size={19} strokeWidth={1.8} />
                </button>
              </div>
            </div>

            {/* Welcome strip */}

            <div
              className="
                relative
                mt-4
                flex items-center
                gap-2
                rounded-2xl
                border border-white/10
                bg-white/5
                px-3
                py-2.5
                backdrop-blur-sm
              "
            >
              <Hotel
                size={14}
                className="shrink-0 text-cyan-300"
              />

              <span className="text-[10px] leading-4 text-blue-100">
                Ask me about your hotel, bookings, rooms, customers,
                reviews and more.
              </span>
            </div>

            {/* Drag indicator */}

            <div className="relative mt-3 flex items-center gap-2">
              <div className="h-px flex-1 bg-white/10" />

              <span className="text-[8px] font-medium uppercase tracking-[0.18em] text-blue-200/50">
                Drag to move
              </span>

              <div className="h-px flex-1 bg-white/10" />
            </div>
          </div>

          {/* =====================================================
              CHAT BODY
          ===================================================== */}

          <div
            className="
              flex-1
              overflow-y-auto
              bg-gradient-to-b
              from-slate-50
              to-white
              px-4
              py-5

              [scrollbar-width:thin]
              [scrollbar-color:#cbd5e1_transparent]
            "
          >
            {/* =====================================================
                EMPTY STATE
            ===================================================== */}

            {messages.length === 0 && !isLoading && (
              <div className="flex min-h-full items-center justify-center">
                <div className="w-full py-6 text-center">
                  <div className="relative mx-auto mb-5 h-[86px] w-[86px]">
                    <div
                      className="
                        absolute inset-0
                        rounded-[28px]
                        bg-blue-500/15
                        blur-xl
                      "
                    />

                    <div
                      className="
                        relative
                        flex h-full w-full
                        items-center justify-center
                        rounded-[28px]
                        border border-blue-100
                        bg-gradient-to-br
                        from-slate-950
                        via-blue-900
                        to-blue-600
                        text-white
                        shadow-[0_18px_40px_rgba(37,99,235,0.25)]
                      "
                    >
                      <Bot
                        size={40}
                        strokeWidth={1.45}
                      />

                      <span
                        className="
                          absolute
                          -top-1
                          left-1/2
                          h-2.5
                          w-2.5
                          -translate-x-1/2
                          rounded-full
                          bg-cyan-300
                          shadow-[0_0_12px_rgba(103,232,249,1)]
                        "
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-1.5">
                    <Sparkles
                      size={13}
                      className="text-blue-500"
                    />

                    <h3 className="text-[15px] font-bold text-slate-800">
                      Conversation cleared
                    </h3>
                  </div>

                  <p className="mx-auto mt-2 max-w-[280px] text-[11px] leading-5 text-slate-400">
                    Start a fresh conversation with your Hotel AI
                    Assistant.
                  </p>

                  <button
                    onClick={() =>
                      sendMessage("How many bookings are there?")
                    }
                    className="
                      mx-auto mt-5
                      flex items-center gap-2
                      rounded-xl
                      border border-blue-100
                      bg-blue-50
                      px-4 py-2.5
                      text-[11px]
                      font-semibold
                      text-blue-600
                      transition-all
                      hover:border-blue-200
                      hover:bg-blue-100
                    "
                  >
                    <MessageCircle size={14} />
                    Start conversation
                  </button>
                </div>
              </div>
            )}

            {/* =====================================================
                MESSAGES
            ===================================================== */}

            <div className="space-y-5">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.sender === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  {msg.sender === "bot" ? (
                    <div className="flex max-w-[91%] items-end gap-2">
                      {/* Bot avatar */}

                      <div
                        className="
                          relative
                          flex h-9 w-9
                          shrink-0
                          items-center justify-center
                          rounded-[13px]
                          bg-gradient-to-br
                          from-slate-950
                          via-blue-900
                          to-blue-600
                          text-white
                          shadow-[0_5px_15px_rgba(37,99,235,0.20)]
                        "
                      >
                        <Bot
                          size={18}
                          strokeWidth={1.6}
                        />

                        <span
                          className="
                            absolute
                            -right-0.5
                            -top-0.5
                            h-2.5
                            w-2.5
                            rounded-full
                            border-2
                            border-white
                            bg-emerald-400
                          "
                        />
                      </div>

                      <div className="min-w-0">
                        <div className="mb-1 ml-1 flex items-center gap-1.5">
                          <span className="text-[9px] font-bold uppercase tracking-wider text-blue-600">
                            Hotel AI
                          </span>

                          <Sparkles
                            size={9}
                            className="text-cyan-500"
                          />
                        </div>

                        <div
                          className="
                            rounded-[19px]
                            rounded-bl-[5px]
                            border
                            border-slate-200
                            bg-white
                            px-4
                            py-3
                            text-[12.5px]
                            leading-5
                            text-slate-700
                            shadow-[0_4px_16px_rgba(15,23,42,0.06)]
                          "
                        >
                          {msg.text}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="
                        max-w-[84%]
                        rounded-[19px]
                        rounded-br-[5px]
                        bg-gradient-to-br
                        from-blue-600
                        via-blue-600
                        to-indigo-600
                        px-4
                        py-3
                        text-[12.5px]
                        leading-5
                        text-white
                        shadow-[0_7px_20px_rgba(37,99,235,0.20)]
                      "
                    >
                      {msg.text}
                    </div>
                  )}
                </div>
              ))}

              {/* =====================================================
                  LOADING
              ===================================================== */}

              {isLoading && (
                <div className="flex items-end gap-2">
                  <div
                    className="
                      relative
                      flex h-9 w-9
                      items-center justify-center
                      rounded-[13px]
                      bg-gradient-to-br
                      from-slate-950
                      via-blue-900
                      to-blue-600
                      text-white
                    "
                  >
                    <Bot
                      size={18}
                      strokeWidth={1.6}
                    />

                    <span
                      className="
                        absolute
                        -right-0.5
                        -top-0.5
                        h-2.5
                        w-2.5
                        rounded-full
                        border-2
                        border-white
                        bg-emerald-400
                      "
                    />
                  </div>

                  <div>
                    <div className="mb-1 ml-1 flex items-center gap-1.5">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-blue-600">
                        Hotel AI
                      </span>
                    </div>

                    <div
                      className="
                        flex items-center gap-3
                        rounded-[19px]
                        rounded-bl-[5px]
                        border border-blue-100
                        bg-white
                        px-4 py-3
                        shadow-[0_4px_16px_rgba(15,23,42,0.06)]
                      "
                    >
                      <div className="flex items-center gap-1">
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-500" />

                        <span
                          className="
                            h-1.5 w-1.5
                            animate-bounce
                            rounded-full
                            bg-indigo-500
                            [animation-delay:150ms]
                          "
                        />

                        <span
                          className="
                            h-1.5 w-1.5
                            animate-bounce
                            rounded-full
                            bg-cyan-500
                            [animation-delay:300ms]
                          "
                        />
                      </div>

                      <span className="text-[10px] font-medium text-slate-400">
                        Analyzing hotel data...
                      </span>

                      <Sparkles
                        size={12}
                        className="animate-pulse text-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* =====================================================
                QUICK QUESTIONS
            ===================================================== */}

            {messages.length <= 1 && !isLoading && (
              <div className="mt-7">
                {/* Heading */}

                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <Sparkles
                        size={13}
                        className="text-blue-500"
                      />

                      <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">
                        Quick Insights
                      </span>
                    </div>

                    <p className="mt-1 text-[10px] text-slate-400">
                      Ask about your hotel data
                    </p>
                  </div>

                  <div
                    className="
                      flex items-center gap-1
                      rounded-full
                      border border-slate-200
                      bg-white
                      px-2 py-1
                    "
                  >
                    <ShieldCheck
                      size={10}
                      className="text-emerald-500"
                    />

                    <span className="text-[8px] font-semibold text-slate-400">
                      Smart AI
                    </span>
                  </div>
                </div>

                {/* Six cards */}

                <div className="grid grid-cols-2 gap-2">
                  {suggestions.map((item) => {
                    const Icon = item.icon;

                    return (
                      <button
                        key={item.text}
                        onClick={() => sendMessage(item.text)}
                        className="
                          group
                          relative
                          overflow-hidden
                          rounded-[16px]
                          border
                          border-slate-200
                          bg-white
                          p-3
                          text-left
                          shadow-[0_2px_8px_rgba(15,23,42,0.03)]
                          transition-all
                          duration-200
                          hover:-translate-y-0.5
                          hover:border-blue-200
                          hover:shadow-[0_8px_20px_rgba(37,99,235,0.10)]
                        "
                      >
                        {/* Hover glow */}

                        <div
                          className="
                            absolute
                            -right-5
                            -top-5
                            h-14
                            w-14
                            rounded-full
                            bg-blue-50
                            opacity-0
                            blur-xl
                            transition
                            group-hover:opacity-100
                          "
                        />

                        <div className="relative flex items-start gap-2.5">
                          <div
                            className="
                              flex h-8 w-8
                              shrink-0
                              items-center justify-center
                              rounded-[10px]
                              bg-blue-50
                              text-blue-600
                              transition
                              group-hover:bg-blue-600
                              group-hover:text-white
                            "
                          >
                            <Icon
                              size={15}
                              strokeWidth={1.8}
                            />
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="mb-0.5 text-[8px] font-bold uppercase tracking-wider text-blue-500">
                              {item.label}
                            </div>

                            <p className="text-[10px] font-semibold leading-4 text-slate-600 transition group-hover:text-blue-700">
                              {item.text}
                            </p>
                          </div>

                          <ChevronRight
                            size={13}
                            className="
                              mt-1
                              shrink-0
                              text-slate-300
                              transition-all
                              group-hover:translate-x-0.5
                              group-hover:text-blue-500
                            "
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* =====================================================
              INPUT
          ===================================================== */}

          <div
            className="
              shrink-0
              border-t
              border-slate-200
              bg-white
              px-3.5
              pb-3
              pt-3
            "
          >
            <div
              className="
                flex items-center gap-2
                rounded-[19px]
                border
                border-slate-200
                bg-slate-50
                p-1.5
                transition-all
                focus-within:border-blue-400
                focus-within:bg-white
                focus-within:ring-4
                focus-within:ring-blue-50
              "
            >
              {/* Input icon */}

              <div className="ml-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white text-blue-500 shadow-sm">
                <MessageCircle
                  size={15}
                  strokeWidth={1.8}
                />
              </div>

              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                placeholder="Ask Hotel AI anything..."
                className="
                  min-w-0
                  flex-1
                  bg-transparent
                  px-1
                  py-2.5
                  text-[12px]
                  text-slate-700
                  outline-none
                  placeholder:text-slate-400
                  disabled:cursor-not-allowed
                "
              />

              <button
                onClick={() => sendMessage()}
                disabled={!message.trim() || isLoading}
                className="
                  flex h-10 w-10
                  shrink-0
                  items-center justify-center
                  rounded-[14px]
                  bg-gradient-to-br
                  from-blue-600
                  to-indigo-600
                  text-white
                  shadow-[0_6px_16px_rgba(37,99,235,0.25)]
                  transition-all
                  hover:scale-105
                  hover:shadow-[0_8px_22px_rgba(37,99,235,0.32)]
                  active:scale-95
                  disabled:cursor-not-allowed
                  disabled:bg-slate-300
                  disabled:from-slate-300
                  disabled:to-slate-300
                  disabled:shadow-none
                "
              >
                <Send
                  size={16}
                  strokeWidth={2}
                />
              </button>
            </div>

            <div className="mt-2 flex items-center justify-center gap-1.5">
              <Bot
                size={10}
                className="text-blue-400"
              />

              <span className="text-[8px] font-semibold uppercase tracking-[0.15em] text-slate-400">
                Powered by Hotel AI
              </span>

              <span className="h-1 w-1 rounded-full bg-emerald-400" />

              <span className="text-[8px] font-medium text-slate-400">
                Secure Assistant
              </span>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          ANIMATIONS
      ===================================================== */}

      <style>
        {`
          @keyframes chatOpen {
            from {
              opacity: 0;
              transform: translateY(18px) scale(0.96);
            }

            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
        `}
      </style>
    </>
  );
}

export default Chatbot;