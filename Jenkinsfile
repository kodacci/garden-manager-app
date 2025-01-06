def PROJECT_VERSION
def DEPLOY_GIT_SCOPE
def PACKAGE_NAME
def WEB_SERVER_IMAGE_TAG

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
                        if (!BRANCH_NAME.startsWith('release/')) {
                            PROJECT_VERSION = PROJECT_VERSION + '-SNAPSHOT'
                        }
                        DEPLOY_GIT_SCOPE =
                                sh(encoding: 'UTF-8', returnStdout: true, script: 'git name-rev --name-only HEAD')
                                        .trim()
                                        .tokenize('/')
                                        .last()
                                        .toLowerCase()
                    }

                    println "Project version: '$PROJECT_VERSION'"
                    println "Git branch scope: '$DEPLOY_GIT_SCOPE'"
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
                            sh "npm run test 2>&1 | cat > \"$logFileName\""
                        }

                        clover(
                                cloverReportDir: 'coverage',
                                cloverReportFileName: 'clover.xml',
                                healthTarget: [methodCoverage: 90, conditionalCoverage: 80, statementCoverage: 90]
                        )
                    } finally {
                        archiveArtifacts(logFileName)
                        sh "rm \"$logFileName\""
                    }
                    println 'Tests running finished'
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

        stage('Deploy to Nexus Snapshots') {
            when {
                not {
                    branch 'release/*'
                }
            }

            steps {
                script {
                    PACKAGE_NAME = "$PROJECT_VERSION-${currentBuild.number}"
                    sh "zip -r ${PACKAGE_NAME}.zip dist"

                    withCredentials([usernamePassword(
                            credentialsId: 'vault-nexus-deployer',
                            usernameVariable: 'USER',
                            passwordVariable: 'PASS'
                    )]) {
                        sh "curl -v --fail-with-body --user \$USER:\$PASS --upload-file ./${PACKAGE_NAME}.zip " +
                                "$NEXUS_HOST/repository/web-ui-bundle-snapshots" +
                                "/pro/ra-tech/garden-manager-app/$PROJECT_VERSION/${PACKAGE_NAME}.zip"
                    }

                    println 'Deploying to nexus finished'
                }
            }
        }

        stage('Build web server docker image') {
            steps {
                script {
                    WEB_SERVER_IMAGE_TAG = "pro.ra-tech/garden-manager-app/$DEPLOY_GIT_SCOPE/" +
                            "web-server:$PROJECT_VERSION-${currentBuild.number}"

                    docker.withServer(DOCKER_HOST, 'jenkins-client-cert') {
                        println 'Building image with tag ' + WEB_SERVER_IMAGE_TAG
                        def image = docker.build(WEB_SERVER_IMAGE_TAG, '-f Dockerfile .')

                        docker.withRegistry(SNAPSHOTS_DOCKER_REGISTRY_HOST, 'vault-nexus-deployer') {
                            image.push()
                            image.push('latest')
                        }
                    }
                }
            }
        }

        stage('Trigger deploy pipeline') {
            steps {
                script {
                    def path = BRANCH_NAME.replaceAll('/', '%2F')
                    build(
                            job: "Garden Manager App Deploy/$path",
                            wait: false,
                            parameters: [
                                    string(name: 'web_server_image', value: WEB_SERVER_IMAGE_TAG)
                            ]
                    )
                }
            }
        }
    }
}
