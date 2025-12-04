pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/saiphonepyaethar/u6609088_perfume-review_docker.git'
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'docker compose build'
            }
        }

        stage('Deploy Containers') {
            steps {
                sh 'docker compose down'
                sh 'docker compose up -d'
            }
        }

        stage('Health Check') {
            steps {
                script {
                    def response = sh (
                        script: "curl -s http://localhost:5000/health",
                        returnStdout: true
                    ).trim()

                    if (!response.contains("ok")) {
                        error("Health check failed: API not healthy")
                    }
                }
            }
        }
    }

    triggers {
        pollSCM('*/2 * * * *')   // every 2 minutes auto build like Ajarn
    }
}
