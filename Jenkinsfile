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

        stage('Wait and Stop Jenkins Deployment') {
            steps {
                echo 'Waiting for 5 minutes before stopping containers...'
                sh 'sleep 300'  // Wait 5 minutes
                sh 'docker-compose -p mjobjenkins -f docker-compose-jenkins.yml down --remove-orphans'
                echo 'Jenkins deployment containers stopped after 5 minutes.'
            }
        }
    }
}
