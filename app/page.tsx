import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      {/* INTRODUCTION */}
      <h1>Nathan Yan</h1>
      <h5>Machine Learning Intern @ Roboflow</h5>
      <p>I am 16 years old, situated in Canada blah blah blah, nathan tell me what to put here. Just make sure it isn't TOOO LONG</p>

      {/* LINKS */}

      <Link href='https://www.linkedin.com/in/nathan-yan2008/'>
        <Image
          src=''
          height={100}
          width={1}
          alt="linkedin logo"
            />
      </Link>


    </main>
  );
}
