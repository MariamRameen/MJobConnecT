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
                // Stop and remove containers and orphaned containers, ignore errors if none exist
                sh 'docker-compose -p mjobjenkins -f docker-compose-jenkins.yml down --remove-orphans || true'

                // Remove old containers forcibly, ignore errors if not found
                sh '''
                  docker rm -f backend_jenkins || true
                  docker rm -f frontend_jenkins || true
                '''
            }
        }

        stage('Build and Start Containers') {
            steps {
                // Build images and start containers in detached mode
                sh 'docker-compose -p mjobjenkins -f docker-compose-jenkins.yml up -d --build'
            }
        }
    }
}

