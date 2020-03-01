pipeline {
    agent {
        docker { image 'angular/ngcontainer:latest' }
    }
    triggers{ cron('H/15 H(9-16) * * 1-5') }
    stages {
        stage ('checkout'){
          steps{
            checkout scm
          }
        }
        stage('Test/Coverage') {
            steps {
                sh 'npm test'
                publishHTML([allowMissing: false, alwaysLinkToLastBuild: false, keepAll: false, reportDir: 'coverage', reportFiles: 'index.html', reportName: 'HTML Cov Report', reportTitles: ''])
            }
        }
        stage('Build') {
            steps {
                sh 'npm build:i18n --prod --build-optimizer'
            }
        }
        stage('deploy') {
            steps {
                sh 'echo future.'
            }
        }
    }
    post {
        always {
            junit "test-results.xml"
        }
    }
}