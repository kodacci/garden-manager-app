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
                    nodejs(nodeJSInstallationName: 'NodeJS v22') {
                        PROJECT_VERSION =
                                sh(
                                        encoding: 'UTF-8',
                                        returnStdout: true,
                                        script: 'node -e "const pkg = require(\'./package.json\'); console.log(pkg.version)"'
                                ).trim()
                        DEPLOY_GIT_SCOPE =
                                sh(encoding: 'UTF-8', returnStdout: true, script: 'git name-rev --name-only HEAD')
                                        .trim()
                                        .tokenize('/')
                                        .last()
                                        .toLowerCase()
                    }

                    echo "Project version: '${PROJECT_VERSION}'"
                    echo "Git branch scope: '${DEPLOY_GIT_SCOPE}'"
                }
            }
        }

        stage('Install All Deps') {
            steps {
                script {
                    nodejs(nodeJSInstallationName: 'NodeJS v22') {
                        sh 'npm install'
                    }
                }
            }
        }

        stage('Prettier') {
            steps {
                script {
                    nodejs(nodeJSInstallationName: 'NodeJS v22') {
                        sh 'npm run pretty'
                    }
                }
            }
        }

        stage('Linter') {
            steps {
                script {
                    nodejs(nodeJSInstallationName: 'NodeJS v22') {
                        sh 'npm run lint'
                    }
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    println('Starting running tests')
                    def logFileName = env.BUILD_TAG + '-test.log'
                    try {
                        nodejs(nodeJSInstallationName: 'NodeJS v22') {
                            sh "npm run test 2>&1| tee $logFileName"
                        }
                    } finally {
                        archiveArtifacts(logFileName)
                        sh "rm $logFileName"
                    }
                    println('Tests running finished')
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    nodejs(nodeJSInstallationName: 'NodeJS v22') {
                        sh 'npm run build'
                    }
                }
            }
        }
    }
}
