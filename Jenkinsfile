pipeline {
    agent any
    tools {
        nodejs "NodeJs" /* make sure to setup the NodeJs version you want to use on your Jenkins server */
    }
    environment {
        /* because JOB_NAME returns the name in the format 'folder_name/job_name' */
        JOB_NAME = "${(env.JOB_NAME.split('/')[1]) ?: env.JOB_NAME}"
    }
    stages {
        stage('Install Dependencies') {
            notifyBuildStarted()
            steps {
                sh 'npm install -g pnpm'
                sh 'pnpm install'
            }
        }

        stage('Build') {
            steps {
                sh 'pnpm build'
            }
        }

        stage('Test') {
            steps {
                sh 'pnpm test'
            }
        }

        stage('Deploy') {
            steps {
                // add deployment steps here
            }
        }
    }

    post {
        always {
            deleteDir()
        }
        success {
            notifyBuildSuccess()
        }
        failure {
            notifyBuildFailure()
        }
    }
}

def notifyBuildStarted() {
    discordSend (
        description: "Build STARTED ${env.JOB_NAME} #${env.BUILD_NUMBER}",
        link: env.BUILD_URL,
        result: 'ABORTED', // sets the left side color of the embed to 'grey'
        title: env.JOB_NAME,
        webhookURL: env.DISCORD_NOTIFICATION_WEBHOOK_URL
    )
}

def notifyBuildSuccess() {
    discordSend (
        description: "Build SUCCESS ${env.JOB_NAME} #${env.BUILD_NUMBER}",
        link: env.BUILD_URL,
        result: 'SUCCESS', // sets the left side color of the embed to 'green'
        title: env.JOB_NAME,
        webhookURL: env.DISCORD_NOTIFICATION_WEBHOOK_URL
    )
}

def notifyBuildFailure() {
    discordSend (
        description: "Build FAILED ${env.JOB_NAME} #${env.BUILD_NUMBER}",
        link: env.BUILD_URL,
        result: 'FAILURE', // sets the left side color of the embed to 'red'
        title: env.JOB_NAME,
        webhookURL: env.DISCORD_NOTIFICATION_WEBHOOK_URL
    )
}