import React, {Component} from 'react';
import './Theme.css';
import AnswerList from "../AnswerList/AnswerList";
import QuestionList from "../QuestionList/QuestionList";

const username = 'Lena Dorogenskaya';

const answerS = [
    {name: 'Pizzeria',
    description:"fdfsfdfsfdsfdsfdsfdssdffs",
    videoSrc: 'https://s3.amazonaws.com/codecademy-content/programs/react/ravenous/pizza.jpg',
    creator: 'Lena',
    rating: 4,
    coinCount: 0,
    id: 12,
    tags:['1'],
    likerList:['Оля Петрова','Lena Dorogenskaya'],
    liked: true
    },

    {name: 'Otto Pizzeria',
    description:"fdfssdffs",
    videoSrc: 'https://s3.amazonaws.com/codecademy-content/programs/react/ravenous/pizza.jpg',
    creator: 'Lena',
    rating: 4,
    id: 13,
    coinCount: 1380,
    tags:['2'],
    likerList:['Миранда Каримова', 'Илья Буяльский', 'Захар Шлимаков'],
    liked: false
    },

    {name: 'MarginOtto Pizzeria',
    tags:['3','2'],
    description:"куцкупцапавпа",
    videoSrc: 'https://s3.amazonaws.com/codecademy-content/programs/react/ravenous/pizza.jpg',
    creator: 'Lena',
    rating: 4,
    id: 14,
    coinCount: 10,
    likerList:['Lena Dorogenskaya', 'Jkz Gtnhjdf'],
    liked: true
    }
];
const questionAll = {
    name: 'all', id: '0'
};
const questionS = [
    {name: 'Mafdf', id: '1'},
    {name: 'Margidfda', id: '2'},
    {name: 'to Pizzeria', id: '3'},
];

class Theme extends Component {
    constructor(props) {
        super(props);

        this.state = {
            answers: answerS,
            questionActive: questionAll,
    }
        this.handleClick = this.handleClick.bind(this);
        this.handleLike = this.handleLike.bind(this);

    }

    handleClick = (questionId) => {
        this.setState({
            answers: answerS.filter(({tags}) => tags.includes(questionId)),
            questionActive: questionId
        })
    };

    handleLike = answer => {
        console.log(answer.liked);

        const answers = [...this.state.answers];
        const index = answers.indexOf(answer);
        answers[index].liked = !answer.liked;

        console.log(answers[index].liked);
        console.log(answers);
        const indexName = answer.likerList.indexOf(username);

        const stateNew = answers.filter(
            answer => answers[index].liked ? answer.likerList.push(username) : answer.likerList.splice(indexName,1)
        )


        this.setState({ answers: stateNew });
        console.log(`I am ${answer.liked}`);
        console.log(answer.likerList);

    };

    render() {
        return (
            <div className="Theme">
                {/*left column*/}
                <div className="Theme-content">
                    <div className="Theme-content__wrapper">
                        <div className="Theme-content__header">
                            <h1 className="Theme-theme">Theme name</h1>
                            <ul className="Theme-theme__types">
                                <li className="Theme-theme__types__items"><a href="">Subject name</a></li>
                                <li className="Theme-theme__types__items"><a href="">Level name</a></li>
                            </ul>
                        </div>
                        <AnswerList
                            answers={this.state.answers}
                            handleClick={this.handleClick}
                            handleLike={this.handleLike}
                        />
                    </div>
                </div>

                {/*right column*/}
                <div className="Theme-questions">
                    <div className="Theme-content__wrapper">
                        <h2>Вопросы по
                            теме</h2>
                        <div>{questionAll.name}</div>
                        <QuestionList
                            handleClick={this.handleClick}
                            questions={questionS}
                            questionActive={this.state.questionActive}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Theme;

