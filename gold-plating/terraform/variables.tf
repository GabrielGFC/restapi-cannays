variable "project" {
  type    = string
  default = "cannasys"
}

variable "env" {
  type    = string
  default = "dev"
}

variable "region" {
  type    = string
  default = "sa-east-1"
}

variable "vpc_cidr" {
  type    = string
  default = "10.0.0.0/16"
}

variable "azs" {
  type    = list(string)
  default = ["sa-east-1a", "sa-east-1c"]
}

variable "db_instance_class" {
  type    = string
  default = "db.t4g.small"
}

variable "db_username" {
  type      = string
  sensitive = true
}

variable "db_password" {
  type      = string
  sensitive = true
}

variable "ecs_cpu" {
  type    = number
  default = 512
}

variable "ecs_memory" {
  type    = number
  default = 1024
}

variable "container_image" {
  type        = string
  description = "ECR image URI: <acct>.dkr.ecr.<region>.amazonaws.com/cannasys-api:<tag>"
}

variable "alert_email" {
  type        = string
  description = "Endereço SNS para alarms (on-call)"
}

variable "monthly_budget_usd" {
  type    = number
  default = 300
}

locals {
  name = "${var.project}-${var.env}"
  tags = {
    Project     = var.project
    Environment = var.env
    ManagedBy   = "terraform"
  }
}
