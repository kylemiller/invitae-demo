import React, { Component, Fragment } from "react";
import API from "./API";

/**
 * Using code from https://alligator.io/react/react-autocomplete/
 */
class Autocomplete extends Component {

    static defaultProps = {
        suggestions: []
    };

    constructor(props) {
        super(props);

        this.state = {
            // The active selection's index
            activeSuggestion: 0,
            // The suggestions that match the user's input
            filteredSuggestions: [],
            // Whether or not the suggestion list is shown
            showSuggestions: false,
            // What the user has entered
            userInput: ""
        };

        this.api = new API();
        this.handleSuggestions = this.handleSuggestions.bind(this);
    }

    // Event fired when the input value is changed
    onChange = e => {
        const { suggestions } = this.props;
        const userInput = e.currentTarget.value;
        if(userInput.length > 0) {
            this.api.getSuggestions(userInput, this.handleSuggestions);
        } else {
            this.setState({
                activeSuggestion: 0,
                filteredSuggestions: [],
                showSuggestions: false,
                userInput:""
            });
        }


    };

    handleSuggestions(userInput, response) {
        this.setState({
            activeSuggestion: 0,
            filteredSuggestions:response,
            showSuggestions: true,
            userInput: userInput
        });
        if(response.length === 1) {
            this.api.getGeneVariants(userInput).then(response => {
                //console.log('response:', response);
                this.props.eventEmitter.emitEvent('gene', [response]);
            });
        }
    };

    // Event fired when the user clicks on a suggestion
    onClick = e => {
        // Update the user input and reset the rest of the state
        const userInput = e.currentTarget.innerText;
        this.setState({
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: e.currentTarget.innerText
        });

        this.api.getGeneVariants(userInput).then(response => {
            //console.log('response:', response);
            this.props.eventEmitter.emitEvent('gene', [response]);
        });
    };

    // Event fired when the user presses a key down
    onKeyDown = e => {
        const { activeSuggestion, filteredSuggestions } = this.state;

        // User pressed the enter key, update the input and close the
        // suggestions
        if (e.keyCode === 13) {
            let userInput = filteredSuggestions[activeSuggestion];
            this.setState({
                activeSuggestion: 0,
                showSuggestions: false,
                userInput: userInput
            });
            this.api.getGeneVariants(userInput).then(response => {
                //console.log('response:', response);
                this.props.eventEmitter.emitEvent('gene', [response]);
            });
        }
        // User pressed the up arrow, decrement the index
        else if (e.keyCode === 38) {
            if (activeSuggestion === 0) {
                return;
            }

            this.setState({ activeSuggestion: activeSuggestion - 1 });
        }
        // User pressed the down arrow, increment the index
        else if (e.keyCode === 40) {
            if (activeSuggestion - 1 === filteredSuggestions.length) {
                return;
            }

            this.setState({ activeSuggestion: activeSuggestion + 1 });
        }
    };

    render() {
        const {
            onChange,
            onClick,
            onKeyDown,
            state: {
                activeSuggestion,
                filteredSuggestions,
                showSuggestions,
                userInput
            }
        } = this;

        let suggestionsListComponent;

        if (showSuggestions && userInput) {
            if (filteredSuggestions.length) {
                suggestionsListComponent = (
                    <ul className="suggestions">
                        {filteredSuggestions.map((suggestion, index) => {
                            let className;

                            // Flag the active suggestion with a class
                            if (index === activeSuggestion) {
                                className = "suggestion-active";
                            }

                            return (
                                <li
                                    className={className}
                                    key={suggestion}
                                    onClick={onClick}
                                >
                                    {suggestion}
                                </li>
                            );
                        })}
                    </ul>
                );
            } else {
                suggestionsListComponent = (
                    <div className="no-suggestions">
                        <em>No suggestions, you're on your own!</em>
                    </div>
                );
            }
        }

        return (
            <Fragment>
                <div className="form-group">
                    <label htmlFor="gene-entry-input" className="control-label">Enter Gene Name</label>
                    <input
                        id="gene-entry-input"
                        type="text"
                        onChange={onChange}
                        onKeyDown={onKeyDown}
                        value={userInput}
                        placeholder="Gene name"
                        style={{marginLeft: "1em"}}
                    />
                    {suggestionsListComponent}
                </div>
            </Fragment>
        );
    }
}

export default Autocomplete;