'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

class HirokiGenerator extends Generator {
    constructor(args, opts) {
        super(args, opts);
        this.option('skip-install', {
            desc: 'Skips installing dependencies during the upgrade process',
            type: Boolean,
            defaults: false
        });
        this.skipInstall = this.options['skip-install'];
    }
    prompting() {
        this.options = {};
        this.log(yosay('Welcome to the rad ' + chalk.red('generator-hiroki') + ' generator!'));
        return this.prompt({
            type: 'confirm',
            name: 'createDirectory',
            message: 'Would you like to create a new directory for your project?',
            default: true
        })
            .then((answer) => {
                if(!answer.createDirectory) {
                    return true;
                }
                this.options.createDirectory = answer.createDirectory;
                return this.prompt({
                    type: 'input',
                    name: 'dirname',
                    message: 'Enter directory name:'
                });
            })
            .then((answer) => {
                this.options.dirname = answer.dirname;
                var prompts = [
                    {
                        type: 'input',
                        name: 'name',
                        message: 'Your proyect name:',
                        default: answer.dirname || this.appname
                    }, {
                        type: 'input',
                        name: 'version',
                        message: 'Your proyect version:',
                        default: '0.0.0'
                    }, {
                        type: 'confirm',
                        name: 'private',
                        message: 'Is your proyect private?',
                        default: true
                    }, {
                        type: 'confirm',
                        name: 'jwt',
                        message: 'Enable jwt validation?',
                        default: true
                    }, {
                        type: 'confirm',
                        name: 'docker',
                        message: 'Want docker structure?',
                        default: true
                    }
                ];
                return this.prompt(prompts);
            }).then((props) => {
                this.props = props;
                return props;
            });
    }
    path() {
        if (this.options.createDirectory) {
            this.destinationRoot(this.options.dirname);
            this.appname = this.options.dirname;
        }
    }
    writing() {
        this.fs.copy(this.templatePath('package.json'), this.destinationPath('package.json'));
        this.fs.copy(this.templatePath('_esformatter'), this.destinationPath('.esformatter'));
        this.fs.copy(this.templatePath('_eslintrc'), this.destinationPath('.eslintrc'));
        this.fs.copy(this.templatePath('_gitignore'), this.destinationPath('.gitignore'));
        this.fs.copy(this.templatePath('basic-node-hiroki'), this.destinationPath('./'));
        this.fs.copyTpl(this.templatePath('_env'), this.destinationPath('.env'), {
            jwt: this.props.jwt
        });
        this.fs.copyTpl(this.templatePath('app.js'), this.destinationPath('app.js'), {
            jwt: this.props.jwt
        });
        this.fs.copyTpl(this.templatePath('basic-node-hiroki/lib/models/user.js'), this.destinationPath('lib/models/user.js'), {
            jwt: this.props.jwt
        });
        let jsonBase = {
            name: this.props.name.replace(' ', '-'),
            version: this.props.version,
            private: this.props.private,
            dependencies: {

            }
        };
        if(this.props.jwt) {
            jsonBase.dependencies.bcrypt = '^3.0.6';
            jsonBase.dependencies.jsonwebtoken = '^8.4.0';
        }

        this.fs.extendJSON(this.destinationPath('package.json'), jsonBase);

        if (this.props.jwt) {
            this.fs.copy(this.templatePath('login-hiroki/'), this.destinationPath('./'));
        }
        if (this.props.docker) {
            this.fs.copy(this.templatePath('docker-hiroki/Dockerfile'), this.destinationPath('Dockerfile'));
            this.fs.copyTpl(this.templatePath('docker-hiroki/docker-compose.yml'), this.destinationPath('docker-compose.yml'), {
                name: this.props.name
            });
        }
    }
    install() {
        if(!this.skipInstall) {
            this.npmInstall();
        }
    }
}

module.exports = HirokiGenerator;
