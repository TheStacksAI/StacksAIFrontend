import { motion } from "framer-motion";

export const Greeting = () => {
  return (
    <div
      key="overview"
      className="max-w-3xl mx-auto md:mt-20 px-4 sm:px-6 md:px-8 w-full min-w-0 flex flex-col justify-center gap-2"
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.5 }}
        className="flex flex-row gap-2 items-center"
      >
        <h1 className="font-serif font-bold text-2xl sm:text-3xl tracking-tight text-text-main">
          Stacks<span className="italic text-accent-indigo">AI</span>
        </h1>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.6 }}
        className="text-base sm:text-lg md:text-xl text-text-dim break-words"
      >
        Talk to Bitcoin. Trade, lend, stack — through conversation.
      </motion.div>
    </div>
  );
};
