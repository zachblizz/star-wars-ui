import React, { Component } from 'react'
import Loading from '../presentations/Loading'
import PageNav from '../presentations/PageNav'
import MyModal from './MyModal';
import ViewType from '../presentations/ViewType'
import ListHeader from '../presentations/ListHeader';
import SearchStuff from '../presentations/SearchStuff'

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { 
  requestApiData, 
  removePerson
} from "../../sagas/actions";
import Layout from '../presentations/Layout';

export class Container extends Component {
  constructor(props) {
    super(props)
    this.state = {
      layout: "card"
    }

    this.inputRef = React.createRef()
  }

  componentDidMount() {
    this.props.requestApi("https://swapi.co/api/people")
  }

  clickNextPrev = which => _ => {
    const url = which === 1 ? this.props.people.next : this.props.people.previous
    this.props.requestApi(url)
  }

  handleClose = () => {
    this.props.removePerson()
  }

  handleClickViewType = ({target}) => {
    this.setState({layout: target.id})
  }
  
  render() {
    const {
      layout
    } = this.state

    const { people, selectedPerson, loading } = this.props

    return (
      <div
        style={{position: "relative"}}
      >
        <SearchStuff
          search={this.search}
          inputRef={this.inputRef}
        />
        {
          people &&
            <PageNav
              onClick={this.clickNextPrev}
              prev={people.previous}
              next={people.next}
              page={0}
              loading={false}
            />
        }
        <ViewType
          handleClick={this.handleClickViewType}
          view={layout}
          value={263}
        />
      {
        selectedPerson.films && 
          <MyModal
            handleClose={this.handleClose}
            open={!!selectedPerson.films}
            person={selectedPerson}
          />
      }
      {
        layout === "list" && (
          <ListHeader
            headerList={[
              {lbl: "name", style: {marginLeft: 255}},
              {lbl: "gender", style: {marginLeft: 117}},
              {lbl: "height", style: {marginLeft: 120}},
              {lbl: "mass", style: {marginLeft: 118}},
            ]}
            headerClick={this.handleClose}
            headerStyle={{marginBottom: 12}}
          />
        )
      }
      {
        people.results && people.results.length > 0 && !loading ?
          people.results.map((person, i) => {
            return (
              person.name && 
                <Layout
                  person={person}
                  key={i}
                  layout={layout}
                />
            )
          })
          : loading 
            ? <Loading /> 
            : <div>Nothing to view...</div>
      }
      </div>
    )
  }
}

const mapStateToProps = ({people, selectedPerson, loading}) => {
  return {people, selectedPerson, loading}
}

const mapDispatchToProps = dispatch => bindActionCreators({ 
  requestApi: url => requestApiData(url),
  removePerson,
}, dispatch)

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Container)