export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen lg:px-6 text-center gap-4 py-4">
      <div className="flex flex-col mb-3">
        <h1 className="text-4xl font-bold mb-4">Welcome to My Weather App</h1>
        <p className="text-xl mb-4">I&apos;m glad to have you here.</p>
      </div>
      <p className="text-left w-full">
        I have used Next.js for the frontend and TailwindCSS for styling. Also I
        have used React Server Components
      </p>
      <p className="text-left w-full">
        For a while I have been working solely on Angular and I wanted to try
        Next.js and I have to say I am impressed with both the ease of use and
        the community support
      </p>
      <p className="text-left w-full">
        I put in an considerable effort to make this app responsive, so while at
        here please do check it out as well
      </p>
      <p className="text-left w-full">
        I have used the WeatherBit API for the data and the weather icons are from
        the WeatherBit website
      </p>
      <div className="text-left w-full">
        <p>Also consider checking out my other projects as well. I&apos;m sure you will find something interesting:</p>
        <ul className="list-inside list-disc text-muted-foreground">
          <li className="hover:text-muted-foreground">
            <a href="https://ai-to-ui.vercel.app/">Beautiful page with hover animation with plain css and html...</a>
          </li>
          <li className="hover:text-muted-foreground">
          <a href="https://vercel.com/sidarth-23/cuvette-microproject-5">SPA app with vanilla JS and localstorage API...</a>
          </li>
          <li className="hover:text-muted-foreground">
            <a href="https://vercel.com/sidarth-23/dynamic-forms-angular">Angular app in the form is generated dynamically with a json file...</a>
          </li>
        </ul>
      </div>
      <div className="text-left w-full mt-3">
        <p>While do have 1 ecommerce full stack application with complete frontend in angular and tailwind, intergrated with an express backend and uses both mongodb and postgreSQL in an single project. But due to difficulty in finding a free backend hosting platform without downtime restrictions, that application is not deployed. Please go through the source code if your find time. </p>
        <ul className="list-inside list-disc text-muted-foreground">
          <li>
        <a href="https://github.com/sidarth-23/food-store-client-side">Frontend repo...</a>
        </li>
        <li>
        <a href="https://github.com/sidarth-23/sequelize-ts-food-store">Backend repo...</a>
        </li>
        </ul>
      </div>
    </div>
  );
}
