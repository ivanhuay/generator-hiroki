'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const fs = require('fs');
const pluralize = require('pluralize');
class ModelGenerator extends Generator {
    prompting() {
        this.options = {};
        this.log(yosay('Welcome to the rad ' + chalk.red('generator-hiroki') + ' generator!'));
        const prompts = [
            {
                type: 'input',
                name: 'modelName',
                message: 'Enter modelName',
                default: 'example'
            },
            {
                type: 'confirm',
                name: 'timestamps',
                message: 'enable timestamps for this model?',
                default: true
            },
            {
                type: 'input',
                name: 'modelFolder',
                message: 'Enter models folder',
                default: 'lib/models'
            }
        ];
        return this.prompt(prompts)
            .then((props) => {
                this.props = props;
                this.props.modelName = pluralize(this.props.modelName).toLowerCase();
                return props;
            });

    }
    camelize(str) {
        if(!str) {
            return str;
        }
        return str.split('')
            .map((letter, index) => index > 0 ? letter : letter.toUpperCase())
            .join('');
    }
    path() {
        this.destinationRoot(this.props.modelFolder);
        console.log(this.destinationRoot());
        console.log('path:', this.destinationPath());
    }
    writing() {
        const files = [
            this.props.modelName
        ];
        fs.readdirSync(this.destinationPath())
            .forEach((file) => {
                if(file !== 'index.js' && file.indexOf('.js') !== -1) {
                    files.push(file.replace('.js', ''));
                }
            });
        console.log('destination: ', this.destinationPath('index.js'));
        this.fs.copyTpl(this.templatePath('lib/models/index.js'), this.destinationPath('index.js'), {
            files,
            camelize: this.camelize
        });
        this.fs.copyTpl(this.templatePath('lib/models/model.js'), this.destinationPath(`${this.props.modelName}.js`), {
            modelName: this.props.modelName,
            timestamps: this.props.timestamps
        });
    }
}

module.exports = ModelGenerator;
