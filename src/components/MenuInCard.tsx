import Link from "next/link";

export default function MenuInCard({
  label = "",
  href = "",
  bgColor,
  textColor,
}) {
  const finalBg = bgColor ?? "linear-gradient(to right, #E44B37, #EC4899)";
  const finalTextColor = textColor ?? "#ffffff";

  return (
    <Link
      href={href}
      className="rounded-[5px] p-[5px] w-full flex justify-center font-medium text-md"
      style={{
        background: finalBg,
        backgroundImage: finalBg.startsWith("linear-gradient")
          ? finalBg
          : undefined,
        color: finalTextColor,
      }}
    >
      {label}
    </Link>
  );
}
