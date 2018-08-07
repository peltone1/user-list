import React from 'react'

class List extends Component {
    state = {
        list: [
            'one', 'two', 'three'
        ]
    }

    render() {
        return (
            <div className="App">
                <div>
                </div>
                <div>
                    <ul>
                        {this.state.list.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
            </div>
        )

    }
}
export default List