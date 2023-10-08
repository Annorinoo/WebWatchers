const db = require('./client');
const { createUser } = require('./');
const { createAdmin, getAllAdmin } = require('./admin');
const { getAllWebsites, createWebsite } = require('./websites');
const { createReview } =  require('./reviews');
const { getAllUsers } = require('./users')

//database name: parent

const dropTables = async () => {
  try {
      await db.query(`
      DROP TABLE IF EXISTS reviews;
      DROP TABLE IF EXISTS websites;
      DROP TABLE IF EXISTS admin;
      DROP TABLE IF EXISTS users;
      `)
  }
  catch(err) {
      throw err;
  }
}

const createTables = async () => {
  try{
      await db.query(`
      CREATE TABLE users(
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) UNIQUE NOT NULL,
          username VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL
      );
      `)

      await db.query(`
      CREATE TABLE admin(
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) UNIQUE NOT NULL,
          username VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          secret VARCHAR(255) UNIQUE
      );
      `)

      await db.query(`
      CREATE TABLE websites(
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) UNIQUE NOT NULL,
          url VARCHAR(225) NOT NULL,
          description VARCHAR(225) NOT NULL,
          image VARCHAR(225) NOT NULL
      );
      `)

      await db.query(`
      CREATE TABLE reviews(
          id SERIAL PRIMARY KEY,
          authorid INTEGER REFERENCES users(id),
          websiteid INTEGER REFERENCES websites(id),
          name VARCHAR(225) UNIQUE NOT NULL,
          content VARCHAR(225) NOT NULL,
          rating INTEGER NOT NULL,
          date DATE NOT NULL
      );
      `)
  }
  catch(err) {
      throw err;
  }
} 

async function createInitialUsers() {
  console.log('Starting to create users...');
  try {

    const usersToCreate = [
      { name: "Emily Johnson", username: "emily", password: "securepass" },
      { name: "Liu Wei", username: "liu", password: "strongpass" },
      { name: "Isabella Garcia", username: "bella", password: "pass1234" },
      { name: "Mohammed Ahmed", username: "mohammed", password: "mysecretpassword" },
      { name: "John Smith", username: "john", password: "password123" },
      { name: "Lily Wang", username: "lily", password: "loginkey"}
    ]
    const users = await Promise.all(usersToCreate.map(createUser));

    console.log('Users created:');
    console.log(users);
    console.log('Finished creating users!');
  } catch (error) {
    console.error('Error creating users!');
    throw error;
  }
}

async function createInitialAdmin() {
  console.log('Starting to create admin...');
  try {
    const adminToCreate = [
      { name: "WebAppAdmin", username: "webadmin", password: "adminpassword123", secret: "NoPublicAccess" },
    ]
    const admin = await Promise.all(adminToCreate.map(admin => createAdmin(admin)));
    
    console.log('Admin created:');
    console.log(admin);
    console.log('Finished creating admin!');
  } catch (error) {
    console.error('Error creating admin!');
    throw error;
  }
}

async function createInitialWebsites() {
  console.log('Starting to create websites...');
  
  try {
    const websitesToCreate = [
      { name: 'Netflix', url: 'https://www.netflix.com/', description: 'Streaming platform to watch movies and shows online.', image: 'https://yt3.googleusercontent.com/ytc/AOPolaSbaST1JBNd9phht_n7tFN-VHx0FlvKPHeSDnmu4Q=s900-c-k-c0x00ffffff-no-rj' },
      { name: 'Discord', url: 'https://discord.com/', description: 'Your place to talk and hangout.', image: 'https://play-lh.googleusercontent.com/0oO5sAneb9lJP6l8c6DH4aj6f85qNpplQVHmPmbbBxAukDnlO7DarDW0b-kEIHa8SQ', },
      { name: 'Twitter', url: 'https://discord.com/', description: 'From breaking news and entertainment to sports and politics, get the full story with all the live commentary.', image: 'https://cdn-icons-png.flaticon.com/512/124/124021.png', },
      { name: 'Slack', url: 'https://discord.com/', description: 'Work more easily with everyone.', image: 'https://yt3.googleusercontent.com/ytc/AOPolaTCsMhpgrJldSw0eABzVJ9JEc1pYyTST4CJ7JzN1Q=s900-c-k-c0x00ffffff-no-rj', },
      { name: 'Reddit', url: 'https://www.reddit.com/', description: 'Dive into anything.', image: 'https://pbs.twimg.com/profile_images/1684669052839473152/e_ATYqfK_400x400.jpg' },
      { name: 'Mimo', url: 'https://mimo.org/', description: 'Learn to Code with Mimo.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKJht4SZsUHqZOR_zW_XJJOosG474aIAMRDQ&usqp=CAU' },
      { name: 'YouTube', url: 'https://youtube.com/', description: 'Share your videos with friends, family, and the world.', image: 'https://www.youtube.com/img/desktop/yt_1200.png' },
      { name: 'ChatGPT', url: 'https://chat.openai.com/', description: 'AI-powered language model developed by OpenAI, capable of generating human-like text based on context and past conversations.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/800px-ChatGPT_logo.svg.png' },
    ]
    const websites = await Promise.all(websitesToCreate.map(websites => createWebsite(websites)));

    console.log('Websites created:');
    console.log(websites);
    console.log('Finished creating websites!');
  } catch (error) {
    console.error('Error creating websites!');
    throw error;
  }
}

async function createInitialReviews() {
  console.log('Starting to create reviews...');
  
  try {
    const [emily, liu, bella, mohammed, john, lily] = await getAllUsers();
    //console.log('authorid', emily, liu, bella, mohammed, john, lily);
    //console.log("emily.id", emily.id);
    const [Netflix, Discord, Twitter, Slack, Reddit, Mimo, YouTube, ChatGPT] = await getAllWebsites();
    //console.log("websiteid", Netflix, Discord, Twitter, Slack, Reddit, Mimo, YouTube, ChatGPT);

    const reviewsToCreate = [
      { authorid: emily.id, websiteid: Netflix.id, name: 'Thorough review of Netflix', content: 'I love the clear layout of all the shows and movies. It is easy to navigate and find something to watch.', rating: 4, date: '2023-09-13' },
      { authorid: emily.id, websiteid: Reddit.id, name: 'How I feel about Reddit', content: 'I never understood how Reddit really worked, but I think it is a nice platform to talk about anything.', rating: 4, date: '2023-09-14' },
      { authorid: emily.id, websiteid: Mimo.id, name: 'Try Mimo!', content: 'I love Mimo. It is a nice way to learn the basics of web development and helped me a lot.', rating: 5, date: '2023-09-15' },
      { authorid: liu.id, websiteid: YouTube.id, name: 'YouTube', content: 'YouTube is just a classic platform and app. Love it.', rating: 5, date: '2023-09-25' },
      { authorid: liu.id, websiteid: Discord.id, name: 'My thoughts on Discord', content: 'I like how I can play games with my friends with the option to live stream while on call.', rating: 4, date: '2023-09-26' },
      { authorid: liu.id, websiteid: ChatGPT.id, name: 'ChatGPT, interesting', content: 'AI is certainly a powerful tool. I wonder how this application will change in the future.', rating: 5, date: '2023-09-27' },
      { authorid: bella.id, websiteid: Twitter.id, name: 'How I feel about the new Twitter update', content: 'It took some time for me to get used to and I will still be calling it Twitter.', rating: 3, date: '2023-06-17' },
      { authorid: bella.id, websiteid: Netflix.id, name: 'Netflix!', content: 'I think recently I have had trouble looking for things to watch. It would be nice if they had more selection.', rating: 3, date: '2023-07-20' },
      { authorid: bella.id, websiteid: Slack.id, name: 'After trying Slack', content: 'I use Slack for work and after trying it out I really like it! Love the new update too.', rating: 5, date: '2023-07-28' },
      { authorid: mohammed.id, websiteid: Slack.id, name: 'Thoughts after using Slack', content: 'I thought it was pretty easy to use as a first time user. Love how more companies are using it as their communication platform.', rating: 4, date: '2023-08-15' },
      { authorid: mohammed.id, websiteid: Reddit.id, name: 'Reddit', content: 'Met some of my close friends on Reddit. Also, has really nice information on any topic you could think of.', rating: 4, date: '2023-08-25' },
      { authorid: mohammed.id, websiteid: YouTube.id, name: 'YouTube', content: 'An essential platform to all users. Wanted to say I do not like how it does not give you videos if you turn off watch history though.', rating: 4, date: '2023-08-29' },
      { authorid: john.id, websiteid: ChatGPT.id, name: 'Thoughts on AI', content: 'As someone who is older AI technology fascinates me. You could have a conversation with this AI.', rating: 5, date: '2023-09-02' },
      { authorid: john.id, websiteid: Netflix.id, name: 'Coming from a long time Netflix user', content: 'Been using Netflix for year, but i do not know if I can justify the price anymore.', rating: 3, date: '2023-9-12' },
      { authorid: john.id, websiteid: Twitter.id, name: 'Twitter or X?', content: 'Logged onto Twitter one day and the whole thing changed? What happened...', rating: 2, date: '2023-09-25' },
      { authorid: lily.id, websiteid: Mimo.id, name: 'Mimo helped me a lot!', content: 'Anyone who is learning web development should check out Mimo. Fun way to learn!', rating: 5, date: '2023-07-16' },
      { authorid: lily.id, websiteid: Discord.id, name: 'Discord', content: 'I use Discord for a lot of things, playing games, school, talking to friends. Check it out!', rating: 5, date: '2023-08-25' },
      { authorid: lily.id, websiteid: YouTube.id, name: 'Love YouTube', content: 'Watching videos is my favorite way to end the day.', rating: 5, date: '2023-08-30' },
    ]
    const reviews = await Promise.all(reviewsToCreate.map(review => createReview(review)));
    console.log('Reviews created:', reviews);
    console.log('Finished creating reviews!');
  } catch (error) {
    console.error('Error creating reviews!');
    throw error;
  }
}

const seedDatabase = async () => {
    try {
        db.connect();
        await dropTables();
        await createTables();
        await createInitialUsers();
        await createInitialAdmin();
        await createInitialWebsites();
        await createInitialReviews();
    }
    catch (err) {
        throw err;
    }
    finally {
        db.end()
    }
}

seedDatabase();