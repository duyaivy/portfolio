import { personalInfo } from "@/src/data/portfolio";

export default function Footer() {
  return (
    <footer className="pb-5 pt-6 text-center" id="contact">
      <div className="container mx-auto">
        <div className="mt-24 text-center">
          <p className="text-lg tracking-[4px] text-gray-300">
            &copy; {new Date().getFullYear()} From @{personalInfo.handle} with
            ❤️
          </p>
        </div>
      </div>
    </footer>
  );
}
