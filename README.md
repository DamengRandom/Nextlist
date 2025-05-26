This is a Anime list functionality based project which is able to show list of animes.

## Getting Started

First, run the development server, start the local development server by running the following command:

```bash
npm run dev # command to start app locally
# Then open in browser by URL: http://localhost:3333
npm run lint # for lint testing & checking
npm run build # build the nextjs project locally
```

Open [http://localhost:3333](http://localhost:3333) with your browser to see the project UI.

## Learn more about the project

To learn more about Nextlist project, take a look at the following resources:

- Project design (personal thoughts during app development)
  - After reading through the test description, I decided to create a simple project with Next.js and Chakra UI with public Graphql API (Anilist).
  - The core points considered to be covered by thhe project are:
    - Create a modal view to ask user to type username + job title before view the list (Keep teh state persist after page refresh)
    - Create a workflow to redirect user from home page to the information page smoothly (by select the type and sort methods of the animes)
    - List of animes with some css hover effect for the information page anime cards, eg: to allow user to view a bit more information about the anime (was planning to show a mansory grid, but after tested, was not 100% perfect by using pure css grid to make it)
    - Allow the user to find the specific Anime and redirect to the information etails page to view more details about the anime
    - Create a modal view when user requires to check more information about the anime (Referenced from Leonarod.ai UI design, eg: when opening the image as modal view, show left adn right icons for the user to navigate to the previous or next image)
    - Support user to click View details button to go to a unique URL to view more details about the specific anime (fetched dara from Anilist public graphql API)
    - Consider to write some customized css for some styling points (eg: hover effect, border radius, etc)
    - Also write some helper texts to guide the user behaviour (eg: ask user to sign in before view the home page)
    - Need to consider the responsive display for different sized of devices (eg: Desktop, laptoip, mobile devices)
    - Need to add some accessibility support to the project (eg: add aria-label to the buttons)
    - Need to add unit test for test components and functions (eg: test coverage around 80%)
    - Need to add Error handling for fallack UI support (eg: error boundary, not found page)
    - Need to document the project (eg: README.md)
    - Need to consider the code quality (eg: DRY rule, SOLID principles and etc)
    - Need to test before deploy the app to vercel


## Technologuy stack

Project decided to use the following technologies (Also considered to install as less dependencies as possible):

  - Next.js
  - React
  - TypeScript
  - Chakra UI
  - Graphql (including Apollo Client) + (Choosen: Anilist Public API)
  - Zustand
  - React testing library
  - Jest


## Project structure (folders)

Followed the common and modern NextJS project structure:

  - __mocks__ + __test__: Unit testing
  - app: For major UI page routing, including page layout, hoem page, information page (dynamic routing) and not found (error handling) page
  - components: Introduced the sahred components used in the project
  - constants: Defined the common shared constant values used in the project
  - hooks: For all custom hooks used in the project
  - lib:
    - queries: For the graphql queries used in the project
    - store: Client side state management tool setup by using Zustand (including presist the state for the users)
  - theme: Allow customized css definition used in the project
  - type: Define the types used in the project
  - utils: Created utility functions used in the project


## Project functionalities

The major functionalities covered by this project are (which are followed by the listed requirements):

  - ✅ Using aApp router to direct user to different pages, and dynamic route for details page (URL direction)
  - ✅ Created modal to ask user input username and job title before loading the actual home page 
  - ✅ View the list animes on information page and able to hover it for check more detailed information (Referenced from Leaonardo.ai UI design)
  - ✅ Searach name and page number for the anime list data filtering
  - ✅ Show a sticky header on the information page (for non-mobile devices: disabled for enabling user to view more cards contents)
  - ✅ Click previous and next button for page data switching
  - ✅ Reset and clear the current search results
  - ✅ Click go back to the home page button to go back to the home page
  - ✅ Click View morr button for opening the anime modal (modal view)
  - ✅ Click View details button inside anime modal to direct user to a specific page by unqiue url for checkiking the detailed information about the anime
  - ✅ Show the help text for user to click sign button before view the page contents
  - ✅ View the app from mobile devices, tablet devices and desktop devices


## Project testing

Decided to use rect testing library + jest to test the major components + utility functions created in this project

### how to run

```bash
npm run test
# or
npm run test:coverage # checking the unit test with coverage
```


## Project deployment

Using Vercel to deploy the project

  - Project URL: [Visit Nextlist](https://nextlist-cyan.vercel.app/)

## Project thoughts
  - Has learnt quite aa lot from this project, especially in the graphql qeury, nextjs app setup, and charkra css styling and UI components editions
  - Was thinking to implmenet the mansory grid list layout for shown number of animes, it seems like using purce css might not be a perfect approach, and I don't want to install extra npm package just make this happend, so decied to use a simple grid, and I will keep looking for manosry layout best practices to see if I can make it happen or not
  - Might need to write more custom hooks functions (Will keep improving too)
  - Was not able to cover every single file for unit tests (time consideration, want to submit on Monday), just keep the test coverage as 80% for now, and will add more after proeject submitted for review
  - Was not able to finsih the accessibility for every single components, but also will keep trying add more after proeject submitted for review
  - It seems like anilist provided total number is not correct, after tried few testings, didn;t make it (Please correct me if I mis-understand any parts, always happy to learn 🤗)
  - Final word, thank you very much for the test and review in advance ❤️
