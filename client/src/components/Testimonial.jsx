import TestimonialsColumn from "./ui/testimonials-colmn";
import { motion } from "framer-motion";

const testimonials = [
  {
    text: "This AI platform revolutionized our content strategy, streamlining video creation and script writing. It keeps us productive, even with tight deadlines.",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    name: "Briana Patton",
    role: "Content Creator",
  },
  {
    text: "Implementing this AI generator was smooth and quick. The customizable, user-friendly interface made creating viral videos effortless.",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    name: "Bilal Ahmed",
    role: "Social Media Manager",
  },
  {
    text: "The generation speed is exceptional. It gives us endless ideas and provides high-quality video outputs, ensuring our audience stays engaged.",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    name: "Saman Malik",
    role: "Digital Marketer",
  },
  {
    text: "This AI's seamless video generation enhanced our marketing operations and efficiency. Highly recommend for its intuitive text-to-video capabilities.",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    name: "Omar Raza",
    role: "Agency Owner",
  },
  {
    text: "Its robust features and quick rendering have transformed our workflow, making us significantly more efficient at content production.",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    name: "Zainab Hussain",
    role: "Video Editor",
  },
  {
    text: "The smooth AI features exceeded expectations. It streamlined processes, improving overall content engagement across all platforms.",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    name: "Aliza Khan",
    role: "Brand Strategist",
  },
  {
    text: "Our YouTube metrics improved with a consistent posting schedule powered by this AI tool and positive viewer feedback.",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    name: "Farhan Siddiqui",
    role: "Marketing Director",
  },
  {
    text: "They delivered an AI solution that exceeded expectations, understanding our content needs and enhancing our video output.",
    image: "https://randomuser.me/api/portraits/women/8.jpg",
    name: "Sana Sheikh",
    role: "Head of Media",
  },
  {
    text: "Using this AI, our TikTok presence and views significantly improved, boosting our online brand awareness.",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
    name: "Hassan Ali",
    role: "E-commerce Manager",
  },
];


const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);


export default function Testimonials () {
  return (
    <section className="bg-background my-20 relative">

      <div className="container z-10 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
        >
          <div className="flex justify-center">
            <div className="border py-1 px-4 rounded-lg">Testimonials</div>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter mt-5">
            What our users say
          </h2>
          <p className="text-center mt-5 opacity-75">
            See what our customers have to say about us.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={5} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={5} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={5} />
        </div>
      </div>
    </section>
  );
};