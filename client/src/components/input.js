import React from 'react';

export class TextField extends React.Component{
    constructor(props){
        super(props);
    }
    render(){

        return (
            <section>
                <h4>What is your {this.props.name == "phone" ? "phone number" : this.props.name}?</h4>
                <input name={this.props.name} value={this.props.value} onChange={this.props.onChange} key={this.props.value} placeholder={this.props.name} type={this.props.type} placeholder={this.props.name} />
            </section>
        )
    }
}

export class TextArea extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <section>
                <h4>What is your {this.props.name}?</h4>
                <textarea name={this.props.name} value={this.props.value} onChange={this.props.onChange} key={this.props.value} placeholder={this.props.name} id="" cols="50" rows="10"></textarea>
            </section>
        )
    }
}