def PROJECT_VERSION
def DEPLOY_GIT_SCOPE

pipeline {
    agent { label 'jenkins-agent1' }

    options {
        ansiColor('xterm')
    }

    stages {
        stage('Determine version') {
            steps {
                script {
                    PROJECT_VERSION =
                            sh(
                                    encoding: 'UTF-8',
                                    returnStdout: true,
                                    script: 'node -e "const pkg = require(\'./package.json\'); console.log(pkg.version)"'
                            )
                    DEPLOY_GIT_SCOPE =
                            sh(encoding: 'UTF-8', returnStdout: true, script: 'git name-rev --name-only HEAD')
                                    .trim()
                                    .tokenize('/')
                                    .last()
                                    .toLowerCase()

                    echo "Project version: '${PROJECT_VERSION}'"
                    echo "Git branch scope: '${DEPLOY_GIT_SCOPE}'"
                }
            }
        }

        stage('Install All Deps') {
            steps {
                script {
                    sh 'npm install'
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    sh 'npm test'
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    sh 'npm run build'
                }
            }
        }
    }
}
