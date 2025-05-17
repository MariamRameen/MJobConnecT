pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/MariamRameen/MJobConnecT.git'
            }
        }

        stage('Clean Existing Containers') {
            steps {
                sh '''
                  docker-compose -p mjobjenkins -f docker-compose-jenkins.yml down --remove-orphans || true
                  docker rm -f mjob_backend_jenkins || true
                  docker rm -f mjob_frontend_jenkins || true
                '''
            }
        }

        stage('Build and Start Containers') {
            steps {
                sh 'docker-compose -p mjobjenkins -f docker-compose-jenkins.yml up -d --build'
            }
        }

        stage('Wait for App to Start') {
            steps {
                echo 'Waiting 90 seconds for the app to start...'
                sh 'sleep 90'
            }
        }
    }
}

