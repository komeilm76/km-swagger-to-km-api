const fs = require('fs');
const pathModule = require('path');

let swaggerConfig = {
  openapi: '3.0.4',
  info: {
    title: 'OnlineTest.WebAPI',
    version: '1.0',
  },
  paths: {
    '/admin/AgeRange/add': {
      post: {
        tags: ['AgeRange'],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/AddAgeRange',
              },
            },
            'text/json': {
              schema: {
                $ref: '#/components/schemas/AddAgeRange',
              },
            },
            'application/*+json': {
              schema: {
                $ref: '#/components/schemas/AddAgeRange',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'OK',
          },
        },
      },
    },
    '/admin/AgeRange/update': {
      post: {
        tags: ['AgeRange'],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UpdateAgeRange',
              },
            },
            'text/json': {
              schema: {
                $ref: '#/components/schemas/UpdateAgeRange',
              },
            },
            'application/*+json': {
              schema: {
                $ref: '#/components/schemas/UpdateAgeRange',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'OK',
          },
        },
      },
    },
    '/admin/AgeRange/list': {
      get: {
        tags: ['AgeRange'],
        parameters: [
          {
            name: 'Title',
            in: 'query',
            schema: {
              type: 'string',
            },
          },
          {
            name: 'page',
            in: 'query',
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
          {
            name: 'pageSize',
            in: 'query',
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        responses: {
          '200': {
            description: 'OK',
            content: {
              'text/plain': {
                schema: {
                  $ref: '#/components/schemas/AgeRangeDtoPagedList',
                },
              },
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/AgeRangeDtoPagedList',
                },
              },
              'text/json': {
                schema: {
                  $ref: '#/components/schemas/AgeRangeDtoPagedList',
                },
              },
            },
          },
        },
      },
    },
    '/admin/AgeRange/get/{xId}/{id}': {
      get: {
        tags: ['AgeRange'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'integer',
              format: 'int64',
            },
          },
          {
            name: 'xId',
            in: 'path',
            required: true,
            schema: {
              type: 'integer',
              format: 'int64',
            },
          },
        ],
        responses: {
          '200': {
            description: 'OK',
            content: {
              'text/plain': {
                schema: {
                  $ref: '#/components/schemas/AgeRangeDto',
                },
              },
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/AgeRangeDto',
                },
              },
              'text/json': {
                schema: {
                  $ref: '#/components/schemas/AgeRangeDto',
                },
              },
            },
          },
        },
      },
    },
    '/admin/AgeRange/select': {
      get: {
        tags: ['AgeRange'],
        parameters: [
          {
            name: 'Title',
            in: 'query',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'OK',
            content: {
              'text/plain': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Int64SelectDto',
                  },
                },
              },
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Int64SelectDto',
                  },
                },
              },
              'text/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Int64SelectDto',
                  },
                },
              },
            },
          },
        },
      },
    },
    '/admin/Answer/add': {
      post: {
        tags: ['Answer'],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/AddAnswer',
              },
            },
            'text/json': {
              schema: {
                $ref: '#/components/schemas/AddAnswer',
              },
            },
            'application/*+json': {
              schema: {
                $ref: '#/components/schemas/AddAnswer',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'OK',
          },
        },
      },
    },
    '/admin/Answer/update': {
      post: {
        tags: ['Answer'],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UpdateAnswer',
              },
            },
            'text/json': {
              schema: {
                $ref: '#/components/schemas/UpdateAnswer',
              },
            },
            'application/*+json': {
              schema: {
                $ref: '#/components/schemas/UpdateAnswer',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'OK',
          },
        },
      },
    },
    '/admin/Answer/delete': {
      delete: {
        tags: ['Answer'],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/DeleteAnswer',
              },
            },
            'text/json': {
              schema: {
                $ref: '#/components/schemas/DeleteAnswer',
              },
            },
            'application/*+json': {
              schema: {
                $ref: '#/components/schemas/DeleteAnswer',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'OK',
          },
        },
      },
    },
    '/admin/Answer/list/{questionId}': {
      get: {
        tags: ['Answer'],
        parameters: [
          {
            name: 'questionId',
            in: 'path',
            required: true,
            schema: {
              type: 'integer',
              format: 'int64',
            },
          },
        ],
        responses: {
          '200': {
            description: 'OK',
            content: {
              'text/plain': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/AnswerDto',
                  },
                },
              },
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/AnswerDto',
                  },
                },
              },
              'text/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/AnswerDto',
                  },
                },
              },
            },
          },
        },
      },
    },
    '/admin/Answer/get/{id}': {
      get: {
        tags: ['Answer'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'integer',
              format: 'int64',
            },
          },
        ],
        responses: {
          '200': {
            description: 'OK',
            content: {
              'text/plain': {
                schema: {
                  $ref: '#/components/schemas/AnswerDto',
                },
              },
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/AnswerDto',
                },
              },
              'text/json': {
                schema: {
                  $ref: '#/components/schemas/AnswerDto',
                },
              },
            },
          },
        },
      },
    },
    '/admin/Applicant/list': {
      get: {
        tags: ['Applicant'],
        parameters: [
          {
            name: 'PhoneNumber',
            in: 'query',
            schema: {
              type: 'string',
            },
          },
          {
            name: 'NationalCode',
            in: 'query',
            schema: {
              type: 'string',
            },
          },
          {
            name: 'page',
            in: 'query',
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
          {
            name: 'pageSize',
            in: 'query',
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        responses: {
          '200': {
            description: 'OK',
            content: {
              'text/plain': {
                schema: {
                  $ref: '#/components/schemas/ApplicantDtoPagedList',
                },
              },
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ApplicantDtoPagedList',
                },
              },
              'text/json': {
                schema: {
                  $ref: '#/components/schemas/ApplicantDtoPagedList',
                },
              },
            },
          },
        },
      },
    },
    '/admin/Applicant/exame/taken/list': {
      get: {
        tags: ['Applicant'],
        parameters: [
          {
            name: 'applicantId',
            in: 'query',
            schema: {
              type: 'integer',
              format: 'int64',
            },
          },
          {
            name: 'Code',
            in: 'query',
            schema: {
              type: 'string',
            },
          },
          {
            name: 'page',
            in: 'query',
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
          {
            name: 'pageSize',
            in: 'query',
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        responses: {
          '200': {
            description: 'OK',
            content: {
              'text/plain': {
                schema: {
                  $ref: '#/components/schemas/ApplicantExameDtoPagedList',
                },
              },
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ApplicantExameDtoPagedList',
                },
              },
              'text/json': {
                schema: {
                  $ref: '#/components/schemas/ApplicantExameDtoPagedList',
                },
              },
            },
          },
        },
      },
    },
    '/admin/Applicant/exame/taken/detail/{applicantExameId}': {
      get: {
        tags: ['Applicant'],
        parameters: [
          {
            name: 'applicantExameId',
            in: 'path',
            required: true,
            schema: {
              type: 'integer',
              format: 'int64',
            },
          },
        ],
        responses: {
          '200': {
            description: 'OK',
            content: {
              'text/plain': {
                schema: {
                  $ref: '#/components/schemas/ApplicantExameDetailDto',
                },
              },
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ApplicantExameDetailDto',
                },
              },
              'text/json': {
                schema: {
                  $ref: '#/components/schemas/ApplicantExameDetailDto',
                },
              },
            },
          },
        },
      },
    },
    '/auth/Authentication/signIn': {
      post: {
        tags: ['Authentication'],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/SignIn',
              },
            },
            'text/json': {
              schema: {
                $ref: '#/components/schemas/SignIn',
              },
            },
            'application/*+json': {
              schema: {
                $ref: '#/components/schemas/SignIn',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'OK',
          },
        },
      },
    },
    '/auth/Authentication/applicant/register': {
      post: {
        tags: ['Authentication'],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ApplicantRegister',
              },
            },
            'text/json': {
              schema: {
                $ref: '#/components/schemas/ApplicantRegister',
              },
            },
            'application/*+json': {
              schema: {
                $ref: '#/components/schemas/ApplicantRegister',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'OK',
          },
        },
      },
    },
    '/admin/Category/add': {
      post: {
        tags: ['Category'],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/AddCategory',
              },
            },
            'text/json': {
              schema: {
                $ref: '#/components/schemas/AddCategory',
              },
            },
            'application/*+json': {
              schema: {
                $ref: '#/components/schemas/AddCategory',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'OK',
          },
        },
      },
    },
    '/admin/Category/update': {
      post: {
        tags: ['Category'],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UpdateCategory',
              },
            },
            'text/json': {
              schema: {
                $ref: '#/components/schemas/UpdateCategory',
              },
            },
            'application/*+json': {
              schema: {
                $ref: '#/components/schemas/UpdateCategory',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'OK',
          },
        },
      },
    },
    '/admin/Category/list': {
      get: {
        tags: ['Category'],
        parameters: [
          {
            name: 'Title',
            in: 'query',
            schema: {
              type: 'string',
            },
          },
          {
            name: 'page',
            in: 'query',
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
          {
            name: 'pageSize',
            in: 'query',
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        responses: {
          '200': {
            description: 'OK',
            content: {
              'text/plain': {
                schema: {
                  $ref: '#/components/schemas/CategoryDtoPagedList',
                },
              },
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/CategoryDtoPagedList',
                },
              },
              'text/json': {
                schema: {
                  $ref: '#/components/schemas/CategoryDtoPagedList',
                },
              },
            },
          },
        },
      },
    },
    '/admin/Category/get/{id}': {
      get: {
        tags: ['Category'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'integer',
              format: 'int64',
            },
          },
        ],
        responses: {
          '200': {
            description: 'OK',
            content: {
              'text/plain': {
                schema: {
                  $ref: '#/components/schemas/CategoryDto',
                },
              },
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/CategoryDto',
                },
              },
              'text/json': {
                schema: {
                  $ref: '#/components/schemas/CategoryDto',
                },
              },
            },
          },
        },
      },
    },
    '/admin/Category/select': {
      get: {
        tags: ['Category'],
        parameters: [
          {
            name: 'Title',
            in: 'query',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'OK',
            content: {
              'text/plain': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Int64SelectDto',
                  },
                },
              },
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Int64SelectDto',
                  },
                },
              },
              'text/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Int64SelectDto',
                  },
                },
              },
            },
          },
        },
      },
    },
    '/common/Common/exame/list': {
      get: {
        tags: ['Common'],
        parameters: [
          {
            name: 'AgeRangeId',
            in: 'query',
            schema: {
              type: 'integer',
              format: 'int64',
            },
          },
          {
            name: 'CategoryId',
            in: 'query',
            schema: {
              type: 'integer',
              format: 'int64',
            },
          },
        ],
        responses: {
          '200': {
            description: 'OK',
            content: {
              'text/plain': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/ExameDto',
                  },
                },
              },
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/ExameDto',
                  },
                },
              },
              'text/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/ExameDto',
                  },
                },
              },
            },
          },
        },
      },
    },
    '/common/Common/ageRange/select': {
      get: {
        tags: ['Common'],
        parameters: [
          {
            name: 'Title',
            in: 'query',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'OK',
            content: {
              'text/plain': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Int64SelectDto',
                  },
                },
              },
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Int64SelectDto',
                  },
                },
              },
              'text/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Int64SelectDto',
                  },
                },
              },
            },
          },
        },
      },
    },
    '/common/Common/category/select': {
      get: {
        tags: ['Common'],
        parameters: [
          {
            name: 'Title',
            in: 'query',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'OK',
            content: {
              'text/plain': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Int64SelectDto',
                  },
                },
              },
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Int64SelectDto',
                  },
                },
              },
              'text/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Int64SelectDto',
                  },
                },
              },
            },
          },
        },
      },
    },
    '/common/Common/city/select/{provinceId}': {
      get: {
        tags: ['Common'],
        parameters: [
          {
            name: 'provinceId',
            in: 'path',
            required: true,
            schema: {
              type: 'integer',
              format: 'int64',
            },
          },
        ],
        responses: {
          '200': {
            description: 'OK',
            content: {
              'text/plain': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Int64SelectDto',
                  },
                },
              },
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Int64SelectDto',
                  },
                },
              },
              'text/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Int64SelectDto',
                  },
                },
              },
            },
          },
        },
      },
    },
    '/common/Common/province/select': {
      get: {
        tags: ['Common'],
        responses: {
          '200': {
            description: 'OK',
            content: {
              'text/plain': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Int64SelectDto',
                  },
                },
              },
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Int64SelectDto',
                  },
                },
              },
              'text/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Int64SelectDto',
                  },
                },
              },
            },
          },
        },
      },
    },
    '/applicant/Exame/add': {
      post: {
        tags: ['Exame'],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/AddApplicantExame',
              },
            },
            'text/json': {
              schema: {
                $ref: '#/components/schemas/AddApplicantExame',
              },
            },
            'application/*+json': {
              schema: {
                $ref: '#/components/schemas/AddApplicantExame',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'OK',
          },
        },
      },
    },
    '/applicant/Exame/all/{id}': {
      get: {
        tags: ['Exame'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'integer',
              format: 'int64',
            },
          },
        ],
        responses: {
          '200': {
            description: 'OK',
            content: {
              'text/plain': {
                schema: {
                  $ref: '#/components/schemas/ExameAllDto',
                },
              },
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ExameAllDto',
                },
              },
              'text/json': {
                schema: {
                  $ref: '#/components/schemas/ExameAllDto',
                },
              },
            },
          },
        },
      },
    },
    '/applicant/Exame/taken/list': {
      get: {
        tags: ['Exame'],
        parameters: [
          {
            name: 'Code',
            in: 'query',
            schema: {
              type: 'string',
            },
          },
          {
            name: 'page',
            in: 'query',
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
          {
            name: 'pageSize',
            in: 'query',
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        responses: {
          '200': {
            description: 'OK',
            content: {
              'text/plain': {
                schema: {
                  $ref: '#/components/schemas/ApplicantExameDtoPagedList',
                },
              },
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ApplicantExameDtoPagedList',
                },
              },
              'text/json': {
                schema: {
                  $ref: '#/components/schemas/ApplicantExameDtoPagedList',
                },
              },
            },
          },
        },
      },
    },
    '/applicant/Exame/taken/detail/{applicantExameId}': {
      get: {
        tags: ['Exame'],
        parameters: [
          {
            name: 'applicantExameId',
            in: 'path',
            required: true,
            schema: {
              type: 'integer',
              format: 'int64',
            },
          },
        ],
        responses: {
          '200': {
            description: 'OK',
            content: {
              'text/plain': {
                schema: {
                  $ref: '#/components/schemas/ApplicantExameDetailDto',
                },
              },
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ApplicantExameDetailDto',
                },
              },
              'text/json': {
                schema: {
                  $ref: '#/components/schemas/ApplicantExameDetailDto',
                },
              },
            },
          },
        },
      },
    },
    '/admin/Exame/add': {
      post: {
        tags: ['Exame'],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/AddExame',
              },
            },
            'text/json': {
              schema: {
                $ref: '#/components/schemas/AddExame',
              },
            },
            'application/*+json': {
              schema: {
                $ref: '#/components/schemas/AddExame',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'OK',
          },
        },
      },
    },
    '/admin/Exame/update': {
      post: {
        tags: ['Exame'],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UpdateExame',
              },
            },
            'text/json': {
              schema: {
                $ref: '#/components/schemas/UpdateExame',
              },
            },
            'application/*+json': {
              schema: {
                $ref: '#/components/schemas/UpdateExame',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'OK',
          },
        },
      },
    },
    '/admin/Exame/list': {
      get: {
        tags: ['Exame'],
        parameters: [
          {
            name: 'Title',
            in: 'query',
            schema: {
              type: 'string',
            },
          },
          {
            name: 'Code',
            in: 'query',
            schema: {
              type: 'string',
            },
          },
          {
            name: 'AgeRangeId',
            in: 'query',
            schema: {
              type: 'integer',
              format: 'int64',
            },
          },
          {
            name: 'CategoryId',
            in: 'query',
            schema: {
              type: 'integer',
              format: 'int64',
            },
          },
          {
            name: 'page',
            in: 'query',
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
          {
            name: 'pageSize',
            in: 'query',
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        responses: {
          '200': {
            description: 'OK',
            content: {
              'text/plain': {
                schema: {
                  $ref: '#/components/schemas/ExameDtoPagedList',
                },
              },
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ExameDtoPagedList',
                },
              },
              'text/json': {
                schema: {
                  $ref: '#/components/schemas/ExameDtoPagedList',
                },
              },
            },
          },
        },
      },
    },
    '/admin/Exame/get/{id}': {
      get: {
        tags: ['Exame'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'integer',
              format: 'int64',
            },
          },
        ],
        responses: {
          '200': {
            description: 'OK',
            content: {
              'text/plain': {
                schema: {
                  $ref: '#/components/schemas/ExameDto',
                },
              },
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ExameDto',
                },
              },
              'text/json': {
                schema: {
                  $ref: '#/components/schemas/ExameDto',
                },
              },
            },
          },
        },
      },
    },
    '/admin/Exame/all/{id}': {
      get: {
        tags: ['Exame'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'integer',
              format: 'int64',
            },
          },
        ],
        responses: {
          '200': {
            description: 'OK',
            content: {
              'text/plain': {
                schema: {
                  $ref: '#/components/schemas/ExameAllDto',
                },
              },
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ExameAllDto',
                },
              },
              'text/json': {
                schema: {
                  $ref: '#/components/schemas/ExameAllDto',
                },
              },
            },
          },
        },
      },
    },
    '/admin/Question/add': {
      post: {
        tags: ['Question'],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/AddQuestion',
              },
            },
            'text/json': {
              schema: {
                $ref: '#/components/schemas/AddQuestion',
              },
            },
            'application/*+json': {
              schema: {
                $ref: '#/components/schemas/AddQuestion',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'OK',
          },
        },
      },
    },
    '/admin/Question/update': {
      post: {
        tags: ['Question'],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UpdateQuestion',
              },
            },
            'text/json': {
              schema: {
                $ref: '#/components/schemas/UpdateQuestion',
              },
            },
            'application/*+json': {
              schema: {
                $ref: '#/components/schemas/UpdateQuestion',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'OK',
          },
        },
      },
    },
    '/admin/Question/delete': {
      delete: {
        tags: ['Question'],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/DeleteQuestion',
              },
            },
            'text/json': {
              schema: {
                $ref: '#/components/schemas/DeleteQuestion',
              },
            },
            'application/*+json': {
              schema: {
                $ref: '#/components/schemas/DeleteQuestion',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'OK',
          },
        },
      },
    },
    '/admin/Question/list/{exameId}': {
      get: {
        tags: ['Question'],
        parameters: [
          {
            name: 'exameId',
            in: 'path',
            required: true,
            schema: {
              type: 'integer',
              format: 'int64',
            },
          },
        ],
        responses: {
          '200': {
            description: 'OK',
            content: {
              'text/plain': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/QuestionDto',
                  },
                },
              },
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/QuestionDto',
                  },
                },
              },
              'text/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/QuestionDto',
                  },
                },
              },
            },
          },
        },
      },
    },
    '/admin/Question/get/{id}': {
      get: {
        tags: ['Question'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'integer',
              format: 'int64',
            },
          },
        ],
        responses: {
          '200': {
            description: 'OK',
            content: {
              'text/plain': {
                schema: {
                  $ref: '#/components/schemas/QuestionDto',
                },
              },
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/QuestionDto',
                },
              },
              'text/json': {
                schema: {
                  $ref: '#/components/schemas/QuestionDto',
                },
              },
            },
          },
        },
      },
    },
    '/WeatherForecast': {
      get: {
        tags: ['WeatherForecast'],
        operationId: 'GetWeatherForecast',
        responses: {
          '200': {
            description: 'OK',
            content: {
              'text/plain': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/WeatherForecast',
                  },
                },
              },
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/WeatherForecast',
                  },
                },
              },
              'text/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/WeatherForecast',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      AddAgeRange: {
        type: 'object',
        properties: {
          title: {
            type: 'string',
            nullable: true,
          },
          from: {
            type: 'integer',
            format: 'int32',
          },
          to: {
            type: 'integer',
            format: 'int32',
          },
        },
        additionalProperties: false,
      },
      AddAnswer: {
        type: 'object',
        properties: {
          questionId: {
            type: 'integer',
            format: 'int64',
          },
          title: {
            type: 'string',
            nullable: true,
          },
          score: {
            type: 'integer',
            format: 'int32',
          },
        },
        additionalProperties: false,
      },
      AddApplicantExame: {
        type: 'object',
        properties: {
          exameId: {
            type: 'integer',
            format: 'int64',
          },
          reponses: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/ApplicantReponse',
            },
            nullable: true,
          },
        },
        additionalProperties: false,
      },
      AddCategory: {
        type: 'object',
        properties: {
          title: {
            type: 'string',
            nullable: true,
          },
        },
        additionalProperties: false,
      },
      AddExame: {
        type: 'object',
        properties: {
          title: {
            type: 'string',
            nullable: true,
          },
          description: {
            type: 'string',
            nullable: true,
          },
          categoryId: {
            type: 'integer',
            format: 'int64',
          },
          ageRangeId: {
            type: 'integer',
            format: 'int64',
          },
          code: {
            type: 'string',
            nullable: true,
          },
        },
        additionalProperties: false,
      },
      AddQuestion: {
        type: 'object',
        properties: {
          exameId: {
            type: 'integer',
            format: 'int64',
          },
          title: {
            type: 'string',
            nullable: true,
          },
          answers: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/AnswerCommandModel',
            },
            nullable: true,
          },
        },
        additionalProperties: false,
      },
      AgeRangeDto: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int64',
          },
          title: {
            type: 'string',
            nullable: true,
          },
          from: {
            type: 'integer',
            format: 'int32',
          },
          to: {
            type: 'integer',
            format: 'int32',
          },
        },
        additionalProperties: false,
      },
      AgeRangeDtoPagedList: {
        type: 'object',
        properties: {
          items: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/AgeRangeDto',
            },
            nullable: true,
          },
          page: {
            type: 'integer',
            format: 'int32',
          },
          pageSize: {
            type: 'integer',
            format: 'int32',
          },
          totalPages: {
            type: 'integer',
            format: 'int32',
          },
          totalCounts: {
            type: 'integer',
            format: 'int32',
          },
          hasMore: {
            type: 'boolean',
            readOnly: true,
          },
        },
        additionalProperties: false,
      },
      AnswerAllDto: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int64',
          },
          title: {
            type: 'string',
            nullable: true,
          },
          score: {
            type: 'integer',
            format: 'int32',
          },
        },
        additionalProperties: false,
      },
      AnswerCommandModel: {
        type: 'object',
        properties: {
          title: {
            type: 'string',
            nullable: true,
          },
          score: {
            type: 'integer',
            format: 'int32',
          },
        },
        additionalProperties: false,
      },
      AnswerDto: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int64',
          },
          title: {
            type: 'string',
            nullable: true,
          },
          score: {
            type: 'integer',
            format: 'int32',
          },
          questionId: {
            type: 'integer',
            format: 'int64',
          },
        },
        additionalProperties: false,
      },
      ApplicantDto: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int64',
          },
          gender: {
            type: 'boolean',
          },
          firstName: {
            type: 'string',
            nullable: true,
          },
          lastName: {
            type: 'string',
            nullable: true,
          },
          fullName: {
            type: 'string',
            nullable: true,
          },
          phoneNumber: {
            type: 'string',
            nullable: true,
          },
          nationalCode: {
            type: 'string',
            nullable: true,
          },
          registerDateTime: {
            type: 'string',
            nullable: true,
          },
          birthDate: {
            type: 'string',
            nullable: true,
          },
          provinceName: {
            type: 'string',
            nullable: true,
          },
          provinceId: {
            type: 'integer',
            format: 'int64',
            nullable: true,
          },
          cityName: {
            type: 'string',
            nullable: true,
          },
          cityId: {
            type: 'integer',
            format: 'int64',
            nullable: true,
          },
        },
        additionalProperties: false,
      },
      ApplicantDtoPagedList: {
        type: 'object',
        properties: {
          items: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/ApplicantDto',
            },
            nullable: true,
          },
          page: {
            type: 'integer',
            format: 'int32',
          },
          pageSize: {
            type: 'integer',
            format: 'int32',
          },
          totalPages: {
            type: 'integer',
            format: 'int32',
          },
          totalCounts: {
            type: 'integer',
            format: 'int32',
          },
          hasMore: {
            type: 'boolean',
            readOnly: true,
          },
        },
        additionalProperties: false,
      },
      ApplicantExameDetailDto: {
        type: 'object',
        properties: {
          title: {
            type: 'string',
            nullable: true,
          },
          description: {
            type: 'string',
            nullable: true,
          },
          code: {
            type: 'string',
            nullable: true,
          },
          participateDateTime: {
            type: 'string',
            nullable: true,
          },
          responses: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/ApplicantResponseDto',
            },
            nullable: true,
          },
        },
        additionalProperties: false,
      },
      ApplicantExameDto: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int64',
          },
          exameId: {
            type: 'integer',
            format: 'int64',
          },
          title: {
            type: 'string',
            nullable: true,
          },
          description: {
            type: 'string',
            nullable: true,
          },
          code: {
            type: 'string',
            nullable: true,
          },
          participateDateTime: {
            type: 'string',
            nullable: true,
          },
        },
        additionalProperties: false,
      },
      ApplicantExameDtoPagedList: {
        type: 'object',
        properties: {
          items: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/ApplicantExameDto',
            },
            nullable: true,
          },
          page: {
            type: 'integer',
            format: 'int32',
          },
          pageSize: {
            type: 'integer',
            format: 'int32',
          },
          totalPages: {
            type: 'integer',
            format: 'int32',
          },
          totalCounts: {
            type: 'integer',
            format: 'int32',
          },
          hasMore: {
            type: 'boolean',
            readOnly: true,
          },
        },
        additionalProperties: false,
      },
      ApplicantRegister: {
        type: 'object',
        properties: {
          phoneNumber: {
            type: 'string',
            nullable: true,
          },
          password: {
            type: 'string',
            nullable: true,
          },
          firstName: {
            type: 'string',
            nullable: true,
          },
          lastName: {
            type: 'string',
            nullable: true,
          },
          nationalCode: {
            type: 'string',
            nullable: true,
          },
          birthDate: {
            type: 'string',
            format: 'date-time',
          },
          cityId: {
            type: 'integer',
            format: 'int64',
          },
          gender: {
            type: 'boolean',
          },
        },
        additionalProperties: false,
      },
      ApplicantReponse: {
        type: 'object',
        properties: {
          questionId: {
            type: 'integer',
            format: 'int64',
          },
          answerId: {
            type: 'integer',
            format: 'int64',
          },
        },
        additionalProperties: false,
      },
      ApplicantResponseDto: {
        type: 'object',
        properties: {
          questionTitle: {
            type: 'string',
            nullable: true,
          },
          answerTitle: {
            type: 'string',
            nullable: true,
          },
          score: {
            type: 'integer',
            format: 'int32',
          },
        },
        additionalProperties: false,
      },
      CategoryDto: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int64',
          },
          title: {
            type: 'string',
            nullable: true,
          },
        },
        additionalProperties: false,
      },
      CategoryDtoPagedList: {
        type: 'object',
        properties: {
          items: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/CategoryDto',
            },
            nullable: true,
          },
          page: {
            type: 'integer',
            format: 'int32',
          },
          pageSize: {
            type: 'integer',
            format: 'int32',
          },
          totalPages: {
            type: 'integer',
            format: 'int32',
          },
          totalCounts: {
            type: 'integer',
            format: 'int32',
          },
          hasMore: {
            type: 'boolean',
            readOnly: true,
          },
        },
        additionalProperties: false,
      },
      DeleteAnswer: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int64',
          },
        },
        additionalProperties: false,
      },
      DeleteQuestion: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int64',
          },
        },
        additionalProperties: false,
      },
      ExameAllDto: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int64',
          },
          title: {
            type: 'string',
            nullable: true,
          },
          description: {
            type: 'string',
            nullable: true,
          },
          created: {
            type: 'string',
            nullable: true,
          },
          code: {
            type: 'string',
            nullable: true,
          },
          questions: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/QuestionAllDto',
            },
            nullable: true,
          },
        },
        additionalProperties: false,
      },
      ExameDto: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int64',
          },
          title: {
            type: 'string',
            nullable: true,
          },
          description: {
            type: 'string',
            nullable: true,
          },
          created: {
            type: 'string',
            nullable: true,
          },
          code: {
            type: 'string',
            nullable: true,
          },
          ageRange: {
            $ref: '#/components/schemas/AgeRangeDto',
          },
          category: {
            $ref: '#/components/schemas/CategoryDto',
          },
        },
        additionalProperties: false,
      },
      ExameDtoPagedList: {
        type: 'object',
        properties: {
          items: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/ExameDto',
            },
            nullable: true,
          },
          page: {
            type: 'integer',
            format: 'int32',
          },
          pageSize: {
            type: 'integer',
            format: 'int32',
          },
          totalPages: {
            type: 'integer',
            format: 'int32',
          },
          totalCounts: {
            type: 'integer',
            format: 'int32',
          },
          hasMore: {
            type: 'boolean',
            readOnly: true,
          },
        },
        additionalProperties: false,
      },
      Int64SelectDto: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int64',
          },
          title: {
            type: 'string',
            nullable: true,
          },
        },
        additionalProperties: false,
      },
      QuestionAllDto: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int64',
          },
          title: {
            type: 'string',
            nullable: true,
          },
          answers: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/AnswerAllDto',
            },
            nullable: true,
          },
        },
        additionalProperties: false,
      },
      QuestionDto: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int64',
          },
          title: {
            type: 'string',
            nullable: true,
          },
          exameId: {
            type: 'integer',
            format: 'int64',
          },
        },
        additionalProperties: false,
      },
      SignIn: {
        type: 'object',
        properties: {
          userName: {
            type: 'string',
            nullable: true,
          },
          password: {
            type: 'string',
            nullable: true,
          },
        },
        additionalProperties: false,
      },
      UpdateAgeRange: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int64',
          },
          title: {
            type: 'string',
            nullable: true,
          },
          from: {
            type: 'integer',
            format: 'int32',
          },
          to: {
            type: 'integer',
            format: 'int32',
          },
        },
        additionalProperties: false,
      },
      UpdateAnswer: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int64',
          },
          title: {
            type: 'string',
            nullable: true,
          },
          score: {
            type: 'integer',
            format: 'int32',
          },
        },
        additionalProperties: false,
      },
      UpdateCategory: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int64',
          },
          title: {
            type: 'string',
            nullable: true,
          },
        },
        additionalProperties: false,
      },
      UpdateExame: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int64',
          },
          title: {
            type: 'string',
            nullable: true,
          },
          description: {
            type: 'string',
            nullable: true,
          },
          categoryId: {
            type: 'integer',
            format: 'int64',
          },
          ageRangeId: {
            type: 'integer',
            format: 'int64',
          },
          code: {
            type: 'string',
            nullable: true,
          },
        },
        additionalProperties: false,
      },
      UpdateQuestion: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int64',
          },
          title: {
            type: 'string',
            nullable: true,
          },
        },
        additionalProperties: false,
      },
      WeatherForecast: {
        type: 'object',
        properties: {
          date: {
            type: 'string',
            format: 'date',
          },
          temperatureC: {
            type: 'integer',
            format: 'int32',
          },
          temperatureF: {
            type: 'integer',
            format: 'int32',
            readOnly: true,
          },
          summary: {
            type: 'string',
            nullable: true,
          },
        },
        additionalProperties: false,
      },
    },
    securitySchemes: {
      bearer: {
        type: 'http',
        description:
          'JWT Authorization header using the Bearer scheme. Example: "Authorization: Bearer {token}"',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [
    {
      Bearer: [],
    },
  ],
};

type SwaggerConfig = typeof swaggerConfig;

function toZodType(schema: any, schemas: any): string {
  if (!schema) return 'z.any()';
  if (schema.$ref) {
    const ref = schema.$ref.split('/').pop();
    // Use the actual schema definition from swaggerConfig.components.schemas
    if (ref && schemas[ref]) {
      return toZodType(schemas[ref], schemas);
    }
    return 'z.any()';
  }
  switch (schema.type) {
    case 'string':
      if (schema.format === 'date' || schema.format === 'date-time') return 'z.string()';
      return 'z.string()' + (schema.nullable ? '.nullable()' : '');
    case 'integer':
    case 'number':
      let zodNum = 'z.number()';
      if (schema.format === 'int32' || schema.format === 'int64') zodNum += '.int()';
      if (schema.nullable) zodNum += '.nullable()';
      return zodNum;
    case 'boolean':
      return 'z.boolean()' + (schema.nullable ? '.nullable()' : '');
    case 'array':
      return `z.array(${toZodType(schema.items, schemas)})${schema.nullable ? '.nullable()' : ''}`;
    case 'object':
      if (schema.properties) {
        const props = Object.entries(schema.properties)
          .map(([k, v]: [string, any]) => `${k}: ${toZodType(v, schemas)}`)
          .join(',\n');
        return `z.object({${props}})${schema.nullable ? '.nullable()' : ''}`;
      }
      return 'z.object({})';
    default:
      return 'z.any()';
  }
}

// @ts-ignore
function getRequestZod(pathObj: any, method: string, schemas: any) {
  const req = pathObj[method].requestBody?.content?.['application/json']?.schema;
  let body = req ? toZodType(req, schemas) : 'z.undefined()';
  let params = 'z.object({})';
  let query = 'z.object({})';

  // Path params
  if (pathObj[method].parameters) {
    const paramFields: Record<string, string> = {};
    const queryFields: Record<string, string> = {};
    for (const p of pathObj[method].parameters) {
      if (p.in === 'path') {
        paramFields[p.name] = toZodType(p.schema, schemas);
      }
      if (p.in === 'query') {
        let zod = toZodType(p.schema, schemas);
        if (!p.required) zod += '.optional()';
        queryFields[p.name] = zod;
      }
    }
    params = `z.object({${Object.entries(paramFields)
      .map(([k, v]) => `${k}: ${v}`)
      .join(',')}})`;
    query = `z.object({${Object.entries(queryFields)
      .map(([k, v]) => `${k}: ${v}`)
      .join(',')}})`;
  }
  return { body, params, query };
}

// @ts-ignore
function getResponseZod(pathObj: any, method: string, schemas: any) {
  const resp = pathObj[method].responses?.['200']?.content;
  if (!resp) return 'z.object({})';
  const jsonSchema =
    resp['application/json']?.schema || resp['text/json']?.schema || resp['text/plain']?.schema;
  if (!jsonSchema) return 'z.object({})';
  return toZodType(jsonSchema, schemas);
}

type GenerateApiConfigsOptions = {
  enableParamsInPath?: boolean;
  removeParamsFromFileName?: boolean;
  paramsScopeInFile: '[]' | '{}' | '()';
};

function injectParamsInPath(
  path: string,
  pathObj: any,
  method: string,
  // @ts-ignore
  schemas: any,
  enableParamsInPath?: boolean
): string {
  // If enableParamsInPath is true, keep {param} in path, else remove them
  if (!pathObj[method].parameters) return path;
  let newPath = path;
  for (const p of pathObj[method].parameters) {
    if (p.in === 'path') {
      if (enableParamsInPath) {
        // keep {param} in path
        continue;
      } else {
        // remove /{param} from path
        newPath = newPath.replace(new RegExp(`/\\{${p.name}\\}`), '');
      }
    }
  }
  return newPath;
}

// function generateApiConfigs(
//   swagger: SwaggerConfig,
//   outPath: string,
//   options?: GenerateApiConfigsOptions
// ) {
//   const schemas = swagger.components?.schemas || {};
//   const apiConfigs: string[] = [];
//   for (const [path, pathObj] of Object.entries(swagger.paths)) {
//     for (const method of Object.keys(pathObj)) {
//       // @ts-ignore
//       const op = pathObj[method];
//       // Name
//       const tag = (op.tags && op.tags[0]) || 'Api';
//       const opName = path
//         .replace(/[{}]/g, '')
//         .replace(/^\//, '')
//         .replace(/\//g, '_')
//         .replace(/-/g, '')
//         .replace(/([A-Z])/g, (m) => m)
//         .replace(/[^a-zA-Z0-9_]/g, '');
//       const methodName =
//         tag.charAt(0).toUpperCase() +
//         tag.slice(1) +
//         opName
//           .split('_')
//           .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
//           .join('') +
//         method.charAt(0).toUpperCase() +
//         method.slice(1);

//       // Auth
//       const auth = path.startsWith('/auth') || path.startsWith('/common') ? 'NO' : 'YES';

//       // Request
//       const { body, params, query } = getRequestZod(pathObj, method, schemas);

//       // Response
//       const response = getResponseZod(pathObj, method, schemas);

//       // Path string
//       let pathString = path;
//       pathString = injectParamsInPath(path, pathObj, method, schemas, options?.enableParamsInPath);

//       apiConfigs.push(
//         `export const ${methodName} = kmApi.makeApiConfig({
//   path: \`${pathString}\`,
//   method: '${method}',
//   auth: '${auth}',
//   disable: 'NO',
//   request: {
//     body: ${body},
//     params: ${params},
//     query: ${query},
//   },
//   response: {
//     data: ${response},
//   },
// });`
//       );
//     }
//   }
//   const fileContent = `import kmApi from 'km-api';\nimport { z } from 'zod';\n\n${apiConfigs.join(
//     '\n\n'
//   )}\n`;
//   write(outPath, fileContent);
// }
function generateApiConfigsByPath(
  swagger: SwaggerConfig,
  outDir: string
  // options?: GenerateApiConfigsOptions
) {
  const options: GenerateApiConfigsOptions = {
    enableParamsInPath: false,
    removeParamsFromFileName: false,
    paramsScopeInFile: '[]',
  };
  const schemas = swagger.components?.schemas || {};

  for (const [apiPath, pathObj] of Object.entries(swagger.paths)) {
    for (const method of Object.keys(pathObj)) {
      // @ts-ignore
      const op = pathObj[method];
      const tag = (op.tags && op.tags[0]) || 'Api';
      const opName = apiPath
        .replace(/[{}]/g, '')
        .replace(/^\//, '')
        .replace(/\//g, '_')
        .replace(/-/g, '')
        .replace(/([A-Z])/g, (m: string) => m)
        .replace(/[^a-zA-Z0-9_]/g, '');
      const methodName =
        tag.charAt(0).toUpperCase() +
        tag.slice(1) +
        opName
          .split('_')
          .map((s: string) => s.charAt(0).toUpperCase() + s.slice(1))
          .join('') +
        method.charAt(0).toUpperCase() +
        method.slice(1);

      const auth = apiPath.startsWith('/auth') || apiPath.startsWith('/common') ? 'NO' : 'YES';
      let { body, params, query } = getRequestZod(pathObj, method, schemas);
      const response = getResponseZod(pathObj, method, schemas);

      // Optionally remove params from api config
      if (options?.removeParamsFromFileName) {
        params = 'z.object({})';
      }

      // Path string
      let pathString = apiPath;
      // If removeParamsFromFileName is true, also remove path params from the path string
      if (options?.removeParamsFromFileName) {
        // @ts-ignore
        if (pathObj[method].parameters) {
          // @ts-ignore
          for (const p of pathObj[method].parameters) {
            if (p.in === 'path') {
              pathString = pathString.replace(new RegExp(`/\\{${p.name}\\}`), '');
            }
          }
        }
      } else {
        pathString = injectParamsInPath(
          apiPath,
          pathObj,
          method,
          schemas,
          options?.enableParamsInPath
        );
      }

      // Directory and file path
      // Build directory pattern based on the pathString (after param injection)
      const cleanPath = pathString.replace(/^\//, '').replace(/\/$/, '');
      const segments = cleanPath
        .split('/')
        .filter(Boolean)
        .map((s) => {
          // If enableParamsInPath is true, keep {param} in path, else remove them from directory structure
          if (options?.enableParamsInPath) {
            return s;
          } else {
            return s.replace(/[{}]/g, '');
          }
        });

      let dir = outDir;
      for (let i = 0; i < segments.length - 1; i++) {
        dir = pathModule.join(dir, segments[i]);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
      }

      // --- FILENAME LOGIC ---
      // Find all path params in the original apiPath
      const paramMatches = [...apiPath.matchAll(/\{([^}]+)\}/g)];
      let fileName = '';
      if (options?.removeParamsFromFileName) {
        // Remove params from filename
        fileName = `${segments[segments.length - 1] || 'index'}.${method}.ts`;
      } else if (paramMatches.length > 0) {
        // Add params to filename, using paramsScopeInFile
        let base = segments[segments.length - 1] || 'index';
        const scope = options?.paramsScopeInFile || '{}';
        let paramsStr = '';
        if (scope === '{}') {
          paramsStr = paramMatches.map((m) => `{${m[1]}}`).join('');
        } else if (scope === '[]') {
          paramsStr = paramMatches.map((m) => `[${m[1]}]`).join('');
        } else if (scope === '()') {
          paramsStr = paramMatches.map((m) => `(${m[1]})`).join('');
        }
        base += paramsStr;
        fileName = `${base}.${method}.ts`;
      } else {
        fileName = `${segments[segments.length - 1] || 'index'}.${method}.ts`;
      }
      // --- END FILENAME LOGIC ---

      const filePath = pathModule.join(dir, fileName);

      const fileContent = `import kmApi from 'km-api';
import { z } from 'zod';

export const ${methodName} = kmApi.makeApiConfig({
  path: \`${pathString}\`,
  method: '${method}',
  auth: '${auth}',
  disable: 'NO',
  request: {
    body: ${body},
    params: ${params},
    query: ${query},
  },
  response: {
    data: ${response},
  },
});
`;

      fs.writeFileSync(filePath, fileContent, 'utf8');
    }
  }
}

export default {
  //   generateApiConfigs,
  generateApiConfigsByPath,
  swaggerConfig,
};
