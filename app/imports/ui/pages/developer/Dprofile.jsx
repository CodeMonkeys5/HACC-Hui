import React from 'react';
import { Grid, Header, Segment, Dropdown, Button } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import {
  AutoForm,
  ErrorsField,
  LongTextField,
  SubmitField,
  SelectField,
  TextField,
  RadioField,
} from 'uniforms-semantic';
import _ from 'underscore';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { SimpleSchema2Bridge } from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Developers } from '../../../api/user/DeveloperCollection';
import { Skills } from '../../../api/skill/SkillCollection';
import { Tools } from '../../../api/tool/ToolCollection';

// Create a schema to specify the structure of the data to appear in the form.
const schema = new SimpleSchema({

  linkedIn: String,
  gitHub: String,
  website: String,
  aboutMe: String,
  condition: {
    type: String,
    allowedValues: ['excellent', 'good', 'fair', 'poor'],
    defaultValue: 'good',
  },
});

/**
 * Renders the Page for adding stuff. **deprecated**
 * @memberOf ui/pages
 */
class Dprofile extends React.Component {
  numskill;

  skillSet;

  levelSet;

  skills_level;

  skill;

  level;

  constructor(props) {
    super(props);
    this.numskill = 0;
    this.skillSet = [];
    this.levelSet = [];
    this.skills_level = [];
    this.state = { Skilladded: false };

  }

  renderSkill() {
    const handleOnChange = (e, data) => {
      this.skill = _.findWhere(data.options, { value: data.value });
      console.log(this.skill);
    };
    const SkillArray = this.props.skills;
    //console.log(SkillArray);
    const Skillname = [];
    for (let i = 0; i < SkillArray.length; i++) {
      const sn = { key: SkillArray[i]._id, text: SkillArray[i].name, value: SkillArray[i].name };
      Skillname.push(sn);
    }
    //console.log(Skillname);
    // eslint-disable-next-line max-len
   // return Skillname.map((skill, i) => <Dropdown.Item key={i} onClick={() => this.selectSkill(skill)} >{skill}</Dropdown.Item>);
   return <Dropdown placeholder="please pick a skill" selection options={Skillname} onChange={handleOnChange} />;
  }



  renderLevel() {
    const handleOnChange = (e, data) => {
      this.level = _.findWhere(data.options, { value: data.value });
      console.log(this.level);
    };
    // eslint-disable-next-line max-len
    const Levels = [{ key: 0, text: 'Experienced', value: 'Experienced' }, { key: 1, text: 'Novice', value: 'Novice' }, { key: 2, text: 'Don\'t know, but would like to learn', value: 'Don\'t know, but would like to learn' }];
    // eslint-disable-next-line max-len
    // return Skillname.map((skill, i) => <Dropdown.Item key={i} onClick={() => this.selectSkill(skill)} >{skill}</Dropdown.Item>);
    // eslint-disable-next-line max-len
    return <Dropdown placeholder="please pick a Level for the skill" fluid selection options={Levels} onChange={handleOnChange} />;
  }

  renderSkill_level() {

    if (this.skillSet.length > 0) {
      console.log(this.skillSet.length);
      for (let i = 0; i < this.skillSet.length; i++) {

        return <Grid.Row>
          <Grid.Column width={1} style={{ marginTop: `${10}px` }}>
            <Header as='h3'>Skill:</Header> </Grid.Column>
          <Grid.Column width={4}>{this.skillSet[i].name}</Grid.Column>
          {/* eslint-disable-next-line max-len */}
          <Grid.Column width={1} style={{ marginTop: `${10}px` }}><Header as='h3'>Level:</Header> </Grid.Column>
          <Grid.Column width={5}>{this.skillSet[i].level}</Grid.Column>
        </Grid.Row>;
      }
    }
    // eslint-disable-next-line eqeqeq
    else { return ''; }

}

  addSkill() {
        const SkillObject = {};
      if (this.skill != null) {
            SkillObject.key = this.skill.key;
             SkillObject.name = this.skill.text;
           SkillObject.level = this.level.value;
            console.log(SkillObject);
        }
      console.log(SkillObject);
      this.skillSet.push(SkillObject);
      console.log(this.skillSet);
      for (let i = 0; i < this.skillSet.length; i++) console.log(`skill${this.skillSet[i].name}`);
      const newState = {Skilladded: true};
      this.setState(newState);

  }

  submit(data, formRef) {
    const docID = 0;
    // const docID = Meteor.userId();
    const { demeogra, lookingForTeam, challenges, interests, skills,
      tools, linkedIn, gitHub, website, aboutMe, isCompliant } = data;
    Developers.update(docID, { demographicLevel: demeogra, lookingForTeam, challenges, interests,
          skills, tools, linkedIn, gitHub, website, aboutMe, isCompliant },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal('Success', 'Item added successfully', 'success');
            formRef.reset();
          }
        });
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    let fRef = null;
    const formSchema = new SimpleSchema2Bridge(schema);
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">developer participation form</Header>
            <Header>, please read and fill out this form</Header>

            <AutoForm ref={ref => { fRef = ref; }} schema={formSchema} onSubmit={data => this.submit(data, fRef)} >
              <Segment>
                <Grid>
                  {this.state.Skilladded ? (this.renderSkill_level()) : ''}
                  <Grid.Row>
                    <Grid.Column width={1} style={{ marginTop: `${10}px` }}>
                      <Header as='h3'>Skill:</Header> </Grid.Column>
                    <Grid.Column width={4}>{this.renderSkill()}</Grid.Column>
                    {/* eslint-disable-next-line max-len */}
                    <Grid.Column width={1} style={{ marginTop: `${10}px` }}><Header as='h3'>Level:</Header> </Grid.Column>
                    <Grid.Column width={5}>{this.renderLevel()}</Grid.Column>
                    <Grid.Column width={3}><Button type='button' onClick={() => this.addSkill()}>Add a skill</Button>
                    </Grid.Column>

                  </Grid.Row>
                </Grid>

                <TextField name='linkedIn'/>
                <TextField name='gitHub'/>
                <TextField name='website'/>
                <LongTextField name='aboutMe'/>
                <SelectField name='condition'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

Dprofile.propTypes = {
  skills: PropTypes.array.isRequired,

};
export default withTracker(() => {

  const subscription = Meteor.subscribe('allSkills');

  return {

    skills: Skills.find({}).fetch(),
    ready: subscription.ready(),

  };
})(Dprofile);
