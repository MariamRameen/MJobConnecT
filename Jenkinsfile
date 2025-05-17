pipeline {
    agent any

    stages {
        stage('Clone') {
            steps {
                git branch: 'main', url: 'https://github.com/MariamRameen/MJobConnecT.git'
            }
        }

        stage('Clean Jenkins Containers') {
            steps {
                sh 'docker-compose -p mjobjenkins -f docker-compose-jenkins.yml down --remove-orphans'
                sh '''
                docker rm -f mjob_backend_jenkins || true
                docker rm -f mjob_frontend_jenkins || true
                '''
            }
        }

        stage('Build & Run Jenkins Deployment') {
            steps {
                sh 'docker-compose -p mjobjenkins -f docker-compose-jenkins.yml up -d --build'
            }
        }

        stage('Wait for App to Start') {
            steps {
                echo 'Waiting for 90 seconds to ensure the app is fully up...'
                sh 'sleep 90'
            }
        }

        stage('Display Deployment Info') {
            steps {
                script {
                    def timestamp = new Date().format("yyyy-MM-dd HH:mm:ss", TimeZone.getTimeZone('UTC'))
                    def commitId = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()
                    writeFile file: 'deployment_info.json', text: """
                    {
                      "last_deployed": "${timestamp}",
                      "triggered_by": "GitHub Commit ID: ${commitId}"
                    }
                    """
                    sh 'cat deployment_info.json'
                }
            }
        }
    }
    post {
        success {
            echo 'Deployment successful!'
        }
        failure {
            echo 'Deployment failed.'
        }
    }
}

