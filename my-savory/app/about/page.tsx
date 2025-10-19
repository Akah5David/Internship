import { PageTransition } from "@/components/page-transition";

export default function AboutPage() {
  return (
    <PageTransition>
      <main className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-16">
        <h1 className="font-serif text-3xl font-semibold tracking-tight md:text-4xl">
          About Foodie
        </h1>

        <p className="mt-6 text-lg leading-relaxed text-foreground">
          Welcome to <strong>Foodie</strong>, your go-to food blog for exploring
          delicious delicacies and mastering easy-to-follow recipes from around
          the world!
        </p>

        <p className="mt-4 leading-relaxed text-muted-foreground">
          We're passionate about bringing you a diverse collection of
          mouth-watering dishes, whether traditional favorites or exciting new
          flavors. Our mission is simple: to make cooking approachable,
          enjoyable, and rewarding for everyone — from beginners to seasoned
          home chefs.
        </p>

        <h2 className="mt-8 font-serif text-2xl font-semibold text-foreground">
          What You'll Find Here
        </h2>

        <ul className="mt-4 space-y-2 text-muted-foreground">
          <li>
            <strong>Step-by-step recipes:</strong> Clear instructions to help
            you prepare everything from quick snacks to elaborate meals with
            confidence.
          </li>
          <li>
            <strong>Cooking tips and tricks:</strong> Practical advice to
            improve your skills, save time, and get the best results in your
            kitchen.
          </li>
          <li>
            <strong>Diverse cuisines:</strong> Explore flavors from multiple
            cultures, including vegan, gluten-free, and allergy-friendly
            options.
          </li>
          <li>
            <strong>Fresh ingredients guidance:</strong> Tips on choosing and
            storing ingredients to ensure the highest quality and taste.
          </li>
        </ul>

        <h2 className="mt-8 font-serif text-2xl font-semibold text-foreground">
          Why Choose Foodie?
        </h2>

        <p className="mt-4 leading-relaxed text-muted-foreground">
          We believe that great food connects people. Our blog is designed to
          inspire you with recipes that are:
        </p>

        <ul className="mt-4 space-y-2 text-muted-foreground">
          <li>Easy to follow and replicate at home</li>
          <li>Tested and refined for consistent success</li>
          <li>Adaptable to suit different tastes and dietary needs</li>
        </ul>

        <h2 className="mt-8 font-serif text-2xl font-semibold text-foreground">
          Our Commitment
        </h2>

        <p className="mt-4 leading-relaxed text-muted-foreground">
          At <strong>Foodie</strong>, we're dedicated to helping you create
          delicious meals with confidence. Whether you're cooking for family,
          friends, or yourself, our recipes and tips are here to guide you every
          step of the way.
        </p>

        <p className="mt-6 text-lg font-semibold text-primary">
          Join our community of food lovers and start your culinary adventure
          today!
        </p>
      </main>
    </PageTransition>
  );
}
