import { CommentOnQuestionUseCase } from './comment-on-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'

describe('[CommentOnQuestionUseCase]', () => {
  let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
  let inMemoryQuestionsRepository: InMemoryQuestionsRepository

  let sut: CommentOnQuestionUseCase

  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()

    sut = new CommentOnQuestionUseCase(
      inMemoryQuestionsRepository,
      inMemoryQuestionCommentsRepository,
    )
  })

  it('should be able to comment on question', async () => {
    const question = makeQuestion()

    await inMemoryQuestionsRepository.create(question)

    await sut.execute({
      questionId: question.id.toString(),
      authorId: question.authorId.toString(),
      content: 'Comment test',
    })

    expect(inMemoryQuestionCommentsRepository.items[0].content).toEqual(
      'Comment test',
    )
  })
})
