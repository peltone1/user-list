import React from 'react'




class Message extends React.Component {
    state = {
        name: '',
        surname: '',
        age: '',
    }
    loadData =(id) => {
    fetch(`https://my-hindus.firebaseio.com/user/${id}.json`)
        .then(response => response.json())
        .then(data => {
            this.setState(data)
        })
    }

componentWillMount(){
    this.loadData(this.props.match.params.id)
}

componentWillReceiveProps(nextProps) {
    this.loadData(nextProps.match.params.id)
}

render() {
    return (
        <div>
            Name: {this.state.name}, Surname: {this.state.surname}, Age: {this.state.age}
        </div>
    )
}
}


// class Message extends React.Component {
//     componentWillReceiveProps(nextProps) {
//         if (this.props.match.params.id !== nextProps.match.params.id) {
//             fetch(`https://my-hindus.firebaseio.com/user/${nextProps.match.params.id}.json`)
//                 .then(response => response.json())
//                 .then(data => {
//                     console.log(data)
//                 })
//         }
//     }
//     render() {
//         return (
//             <div>Hello</div>
//         )
//     }
// }

export default Message 