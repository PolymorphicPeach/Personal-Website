class Dialogue{
    constructor({
        welcome = "Welcome",
        playerOptions = {
            option1: "Option 1",
            option2: "Option 2",
            option3: "Option 3",
            option4: "Option 4",
        },
        responses = {
            one: "Response 1",
            two: "Response 2",
            three: "Response 3",
            four: "Response 4",
        },
        iframeAddress = null,
        showIframeOn = 0,
    })
    {
        this.welcome = welcome;
        this.playerOptions = playerOptions;
        this.responses = responses;
        this.iframeAddress = iframeAddress;
        this.showIframeOn = showIframeOn;
    }
}

const bigfootDialogue = new Dialogue({
    welcome: "Have you seen a sasquatch anywhere around here?",
    playerOptions: {
        option1: "What were you trying to accomplish with this project?",
        option2: "Do you you actually believe in bigfoot?",
        option3: "Are there any interesting insights from this?",
        option4: "Can you show what data you have about sasquatch?"
    },
    responses: {
        one: "This was a project for a Scientific Python class and the goal was simply to explore the dataset. I've come a long was since then and this kind of data exploration has been foundational in machine learning projects.",
        two: "No, not really, but he's kind of iconic and I enjoy working with unusual datasets.",
        three: "Reported sightings were trending up until the mid 2000s, where they sharply decreased. \"Class B,\" far-away, sightings also overtook \"Class A,\" up-close sightings, after this decline.",
        four: "I think I heard a tree-knock..."
    },
    iframeAddress: "http://mywebapp-env.eba-xdfubyku.us-east-1.elasticbeanstalk.com/bigfoot",
    showIframeOn: 4,
})


const ufoDialogue = new Dialogue({
    welcome: "Hi! I'm trying to learn about shapes reported in UFO sightings.",
    playerOptions: {
        option1: "What were you trying to accomplish with this project?",
        option2: "Any interesting findings?",
        option3: "How did you try to improve the dataset?",
        option4: "Can you show what data you have about UFOs?",
    },
    responses: {
        one: "This was a project for a Machine Learning class. I was attempting to train a model that could guess the shape of a UFO in a UFO sighting report.",
        two: "Using the Flair sentiment analysis library, average sentiment of the sighting descriptions have increased since 2020. I also made a cool heat-map of sighting locations in the United States.",
        three: "I improved the dataset by consolodating the original shapes into new categories. I was still unable to train a model, but it's possible that a model could never be trained to accurately predict the reported shape if the shapes are effectively random.",
        four: "Sure.",
    },
    iframeAddress: "http://mywebapp-env.eba-xdfubyku.us-east-1.elasticbeanstalk.com/ufo",
    showIframeOn: 4,
})

const podcastDialogue = new Dialogue({
    welcome: "If I'm coding, I'm probably listening to a podcast.",
    playerOptions: {
        option1: "What were you trying to accomplish with this project?",
        option2: "So, this really works? How accurate is it?",
        option3: "How did the original dataset determine the political leanings of podcast hosts?",
        option4: "Can you show me the project?",
    },
    responses: {
        one: "Train a Machine Learning model (a Decision Tree) to predict the political leanings of podcast hosts based on: category on Apple, podcast name sentiment, episode title sentiment, description sentiment, and date posted.",
        two: "Yes, the final model had a 78% accuracy on the test data. It also correctly predicted the partisan leanings of all of my favorite podcasts that were not in the training or test data.",
        three: "It's on the Popular Political Podcasts Dataset website and it's frequently updated. Long story short: they use a machine learning model that analyzes the hosts' Twitter/X account activity.",
        four: "Sure."
    },
    iframeAddress: "http://mywebapp-env.eba-xdfubyku.us-east-1.elasticbeanstalk.com/podcast",
    showIframeOn: 4,
})

const aerialDialogue = new Dialogue({
    welcome: "I used this Machine Learning model to find the beach!",
    playerOptions: {
        option1: "What were you trying to accomplish with this project?",
        option2: "What are the limitations of this model?",
        option3: "How could you improve this model?",
        option4: "Can you show me the project?",
    },
    responses: {
        one: "This was the capstone project for my first Machine Learning class. The goal was to train a Machine Learning model to categorize aerial pictures. I accomplished this goal: the Random Forest model trained has an accuracy of 91% on the test data!",
        two: "The model only distinguishes between dense residential, medium residential, beach, forest, parking, and desert pictures.",
        three: "This model could be improved by adding more categories and training with more pictures. I trained this model using 1,200 pictures, 200 for each category, and it still took 49 minutes while using my GPU to help with the computations.",
        four: "I also have a Powerpoint that goes more into detail on this project. Ask me more about it in person if you like!"
    },
    iframeAddress: "http://mywebapp-env.eba-xdfubyku.us-east-1.elasticbeanstalk.com/aerial",
    showIframeOn: 4,
})

const welcomeDialogue = new Dialogue({
    welcome: "Hi, welcome to Matthew Peach's Seeking-Employment Island!",
    playerOptions:{
        option1: "What is this island for?",
        option2: "You made this island and everything the residents show me?",
        option3: "Can you tell me about the Software Architecture of the island?",
        option4: "Give me your resume."
    },
    responses:{
        one: "I'd like it to act as a portfolio showcasing some of my projects. The residents here will show you my projects if you speak to them!",
        two: "The code for this island and my other projects will also be on my GitHub, username: PolymorphicPeach. The sprites are free sprites downloaded from Itch.io, the artists are credited in the GitHub project.",
        three: "What you see is an HTML canvas being manipulated by Javascript. Behind the scenes, this exists in a Java Spring project hosted on AWS Elastic Beanstalk.",
        four: "UNDER CONSTRUCTION"
    }
})